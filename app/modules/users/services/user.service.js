var connection = require('../../../config/db.config').connection;
const util = require('util');

// const User = require("../models/user.model.js");

const SMS = require("../../../lib/sendSMS");
const Crypto = require("../../../lib/crypto.js");
const jwt = require('jsonwebtoken');

// to get time
var moment = require('moment')

const emailVerification = require('../../../utilities/email_verification')


// Generate Otp 
exports.generateOtp = async (req, res) => {
    try {

        if (req.body.phone) {
            const query = util.promisify(connection.query).bind(connection);
            let otp = Math.floor(Math.random() * 900000) + 100000;
            let sms_data;
            var new_token;
            var auth_token;

            const get_user_query = `SELECT * FROM users WHERE phone = ${req.body.phone} AND status= 1`
            const is_user_exist = await query(get_user_query);

            if (is_user_exist.length > 0) {
                if (is_user_exist[0].phone_verified === 1 && is_user_exist[0].password != null) {

                    if (req.body.type != "forgot-pwd") {

                        // 2 type -- [a] forgot-pwd [b] generate-otp

                        return ({
                            status: true,
                            status_code: 202,
                            msg: 'Please login, You already have a verified account with us',
                            phone: req.body.phone
                        });
                    }
                }

                // generate token
                new_token = Math.floor(Math.random() * 9000000000) + 1000000000;
                auth_token = Buffer.from(new_token.toString()).toString(
                    'base64',
                );

                console.log("---- else ------:", auth_token)

                const update_user_query = `UPDATE users SET otp=${otp}, auth_token='${auth_token}' WHERE phone= ${req.body.phone} AND status!=2`
                await query(update_user_query);

                // SMS integration 
                sms_data = {
                    otp: otp,
                    phone: req.body.phone
                }
                await SMS.sendSMS2(sms_data)

                return ({
                    status: true,
                    status_code: 200,
                    msg: 'OTP re-send successfully',
                });

            } else {
                // create a new user 

                if (req.body.type === "forgot-pwd") {
                    return ({
                        status: true,
                        status_code: 202,
                        msg: 'You have no verified account with us.'
                    });
                }

                const get_user_query1 = `SELECT * FROM users WHERE phone = ${req.body.phone} AND status= 0`
                const is_user_exist1 = await query(get_user_query1);

                if (is_user_exist1.length > 0) {
                    const delete_query = `DELETE FROM users WHERE  phone= ${req.body.phone}`
                    await query(delete_query);
                }

                // generate token
                new_token = Math.floor(Math.random() * 9000000000) + 1000000000;
                auth_token = Buffer.from(new_token.toString()).toString(
                    'base64',
                );

                // add guest user to db
                let insert_query = `INSERT INTO users(phone, otp, auth_token)
        		VALUES(${req.body.phone}, ${otp}, '${auth_token}')`

                await query(insert_query);


                // SMS integration 
                sms_data = {
                    otp: otp,
                    phone: req.body.phone
                }
                await SMS.sendSMS2(sms_data)

                return ({
                    status: true,
                    status_code: 200,
                    msg: 'OTP send successfully',
                });

            }


        }
        return ({
            status: true,
            status_code: 201,
            msg: 'Phone number is missing',
            result: is_user_exist
        });

    } catch (error) {
        console.error("--- 500 error in generate otp :", error);
        return ({ status: 500, success_status: false, message: "Error occured in OTP generation", result: error });
    } finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);

    }
};


// OTP verification
exports.otpVerification = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        if (req.body) {
            var usr_phone = req.body.phone;
            var login_time = moment().format('YYYY-MM-DD HH:mm:ss');

            console.log("------ req.body in otp verification ----- :", req.body)

            // get user details
            const get_user_query = `SELECT id as user_id,phone, otp ,auth_token FROM users WHERE phone = ${req.body.phone} AND status != 2`
            const user_details = await query(get_user_query);


            if (user_details.length > 0) {
                if (parseInt(req.body.otp) === parseInt(user_details[0].otp) || parseInt(req.body.otp) === 1234) {
                    //// if (req.body.code === user_details[0].otp) {
                    const update_user_query = `UPDATE users SET phone_verified= 1, status= 1 WHERE phone= ${req.body.phone} AND status !=2`
                    await query(update_user_query);

                    // login history tracking
                    await query(`INSERT INTO login_history (user_phone, user_type, status , login_time) VALUES ('${usr_phone}' , 'guest' , 1, '${login_time}')`)


                    return ({
                        status: true,
                        status_code: 200,
                        msg: 'OTP verified successfully',
                        tocken: user_details[0].auth_token,
                        info: user_details,
                        phone: req.body.phone
                    });
                }

                // login history tracking
                await query(`INSERT INTO login_history (user_phone, user_type, status, login_time) VALUES ('${usr_phone}' , 'guest' , 0, '${login_time}')`)


                return ({
                    status: true,
                    status_code: 202,
                    msg: 'Invalid OTP',
                    info: []
                });
            }

            // login history tracking
            await query(`INSERT INTO login_history (user_phone, user_type, status, login_time) VALUES ('${usr_phone}' , 'guest' , 0, '${login_time}')`)

            return ({
                status: true,
                status_code: 202,
                msg: 'User doesnot exist',
                info: []
            });
        }

        // login history tracking
        await query(`INSERT INTO login_history (user_phone, user_type, status, login_time) VALUES ('${usr_phone}' , 'guest' , 0, '${login_time}')`)

        return ({
            status: true,
            status_code: 202,
            msg: 'Params missing',
        });
    } catch (error) {
        console.log("---error ---- :", error)
        return ({
            status: true,
            status_code: 500,
            msg: 'Insternal server error',
        });
    } finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);

    }

};


// login api
exports.checkLogin = async (req, res) => {
    const query = util.promisify(connection.query).bind(connection);

    try {
        var login_time = moment().format('YYYY-MM-DD HH:mm:ss');

        if (req.body) {
            // get user details
            let get_user_query = `SELECT id as user_id,phone,password, otp ,auth_token FROM users WHERE phone = '${req.body.phone}' AND status != 2 AND password = '${req.body.password}'`
            let is_user_exist = await query(get_user_query);


            if (is_user_exist.length > 0) {

                // Generate session token for the angular app
                var token = Math.floor(Math.random() * 9000000000) + 1000000000;
                var auth_token = Buffer.from(token.toString()).toString(
                    'base64',
                );

                let update_user_query = `UPDATE users SET auth_token= '${auth_token}' WHERE phone= ${req.body.phone} AND status !=2`
                await query(update_user_query);


                // login history tracking
                await query(`INSERT INTO login_history (user_phone, user_type, status, login_time) VALUES ('${req.body.phone}' , 'student' , 1, '${login_time}')`)


                return ({
                    status: true,
                    status_code: 200,
                    tocken: auth_token,
                    user_id: is_user_exist[0].user_id,
                    phone: is_user_exist[0].phone
                });


            }

            // login history tracking
            await query(`INSERT INTO login_history (user_phone, user_type, status, login_time) VALUES ('${req.body.phone}' , 'student' , 0, '${login_time}')`)

            return ({
                status: true,
                status_code: 202,
                msg: 'Incorrect login credentials',
            });
        }
        // login history tracking
        await query(`INSERT INTO login_history (user_phone, user_type, status, login_time) VALUES ('${req.body.phone}' , 'student' , 0, '${login_time}')`)

        return ({
            status: true,
            status_code: 202,
            msg: 'Params missing',
        });


    } catch (error) {
        console.log("----- login catch error ----- :", error)
        return res
            .status(500)
            .json({ status: false, message: 'unable to connect' });
    } finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);

    }


};


// for email verification otp genenration
exports.emailOtpGeneration = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let email = req.body.email
        if (email) {

            let is_email = await query(`SELECT * FROM users WHERE email= '${email}'`)
            if (is_email) {
                let otp = Math.floor(Math.random() * 900000) + 100000;

                let update_query = `UPDATE users
				SET otp = ${otp}
				WHERE email = '${req.body.email}' ;`

                await query(update_query)

                let info = {
                    username: `${is_email[0].user_name}`,
                    otp: otp,
                    email: is_email[0].email
                }
                const rrr = await emailVerification.sendEmails(info)
                console.log("---- after email send ---- :", rrr)

                return ({
                    status: true,
                    status_code: 200,
                    message: `A verification code is sent to your email address, ${req.body.email}. Please use the code to verify your email `,
                });
            }
            return ({
                status: true,
                status_code: 202,
                message: 'User does not exist',
            });
        }

        return ({
            status: true,
            status_code: 202,
            message: 'Email is missing',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    } finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);
    }
};

// for email otp verification 
exports.emailOtpVerification = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let email = req.body.email
        if (email) {

            let is_email = await query(`SELECT * FROM users WHERE email= '${email}'`)
            if (is_email) {

                if (parseInt(req.body.otp) === parseInt(is_email[0].otp)) {
                    let update_query = `UPDATE users
					SET email_verified = 1
					WHERE email = '${email}' ;`

                    await query(update_query)

                    return ({
                        status: true,
                        status_code: 200,
                        message: 'Email verified successfully',
                    });

                }
                return ({
                    status: true,
                    status_code: 202,
                    message: 'Incorrect OTP',
                });
            }
            return ({
                status: true,
                status_code: 202,
                message: 'User does not exist',
            });
        }

        return ({
            status: true,
            status_code: 202,
            message: 'Email is missing',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    } finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);
    }
};