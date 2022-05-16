var connection = require('../../../config/db.config').connection;
var util = require('util');

var SMS = require("../../../lib/sendSMS"); // to send SMS

var Razorpay = require('../../../lib/razorPayment')

// to get time
// var moment = require('moment')
const moment = require('moment-timezone');

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

                const update_user_query = `UPDATE users SET otp=${otp}, auth_token='${auth_token}' , user_name='${req.body.user_name}', email='${req.body.email}'  WHERE phone= ${req.body.phone} AND status!=2`
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

// reset Password
exports.resetPassword = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        if (req.body) {
            let is_exist = await query(`SELECT * FROM users WHERE phone=${req.body.phone}`)
            if (is_exist.length > 0) {

                let update_query = `
				UPDATE users
				SET password = '${req.body.new_password}'
				WHERE phone = '${req.body.phone}';`

                await query(update_query)

                return ({
                    status: true,
                    status_code: 200,
                    message: 'Password updated successfully',
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
            msg: 'Params missing',
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

// to get user profile
exports.getProfile = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id
        if (user_id) {

            // get user detials based on id
            let is_exist = await query(`SELECT id, user_name, phone, email FROM users WHERE id=${user_id}`)
            if (is_exist.length > 0) {

                return ({
                    status: true,
                    status_code: 200,
                    message: 'Profile',
                    result: is_exist
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
            msg: 'Params missing',
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

// to get course list
exports.courseList = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let courses = await query(`SELECT id, title, img_url FROM courses WHERE status=1`)

        if (courses.length > 0) {
            return ({
                status: true,
                status_code: 200,
                message: 'courses',
                result: courses
            });
        }
        return ({
            status: true,
            status_code: 202,
            message: 'No Courses',
            result: []
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

// to get package list
exports.packageList = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let packages;
        let select_query;

        let current_date = moment().format('YYYY-MM-DD');

        let update_query = `
                        UPDATE packages
                        SET status = 2
                        WHERE end_date < '${current_date}';`

        await query(update_query)

        select_query = `SELECT p.id, p.title, p.description, p.course_fee, p.course_duration_name, p.course_type ,p.img_url , c.title as category_name
                                FROM packages as p
                                LEFT JOIN courses as c
                                    ON c.id = p.course_id
                                WHERE p.status=1 AND p.end_date > '${current_date}'`
        packages = await query(select_query)


        if (packages.length > 0) {
            return ({
                status: true,
                status_code: 200,
                message: 'packages',
                result: packages
            });
        }

        return ({
            status: true,
            status_code: 202,
            message: 'No packages',
            result: []
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


// to get package details
exports.packageDetails = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        console.log("------ req.params.id ---- :", req.params.id)
        if (req.params.id) {
            let package = await query(`SELECT id, title, img_url, description, benefits, scope, why_us, video_url, course_type, course_fee, course_duration_name FROM packages WHERE status=1 AND id=${req.params.id}`)

            if (package.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: 'package',
                    result: package
                });
            }
            return ({
                status: true,
                status_code: 202,
                message: 'No package',
                result: []
            });
        }
        return ({
            status: true,
            status_code: 202,
            message: 'Package Id is missing',
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


// to get instructor List
exports.instructorList = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let masters = []
        // let courses = await query(`SELECT id as course_id, title as course_title FROM courses WHERE status=1`)

        // if (courses.length > 0) {
        //     for (let i = 0; i < courses.length; i++) {

        // let instructor = await query(`SELECT i.id as instructor_id,i.name, i.description, i.img_url, c.title as course_name
        //                               FROM instructors as i
        //                               LEFT JOIN courses as c
        //                                    ON c.id = i.course_id
        //                               WHERE i.course_id= ${courses[i].course_id} 
        //                               AND i.status=1`)
        // masters.push({ ...courses[i], ...instructor })
        //     }
        // }

        let instructor = await query(`SELECT i.id as instructor_id,i.name, i.description, i.img_url, c.title as course_name, c.id as course_id
        FROM instructors as i
        LEFT JOIN courses as c
             ON c.id = i.course_id
        WHERE  i.status=1`)


        if (instructor.length > 0) {
            return ({
                status: true,
                status_code: 200,
                message: 'masters',
                result: instructor
            });
        }

        return ({
            status: true,
            status_code: 202,
            message: 'No masters',
            result: []
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

// to get home
exports.home = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id
        let user_type = req.user.user_type
        var home;
        let instructor;
        let packages;
        let recommended_packages;

        let user_payment;
        let user_batch;

        let ongoing_class_list;
        let upcoming_class_list;
        let missed_class_list;
        let subject_list;
        let announcement_list;

        let current_date = moment().format('YYYY-MM-DD');


        let update_query = `UPDATE packages
                            SET status = 2
                            WHERE end_date < '${current_date}';`

        await query(update_query)


        console.log("------user_id-------- :", req.user.id)
        console.log("------user_type-------- :", req.user.user_type)
        if (user_id) {

            let payment_query = `SELECT us.id, us.user_id , us.package_id, us.transaction_message 
                                 FROM user_subscription as us
                                 LEFT JOIN packages as p
                                    ON p.id = us.package_id
                                 WHERE user_id=${user_id}  AND p.status =1 AND p.end_date > '${current_date}' AND us.transaction_message ='Success'
                                 `
            user_payment = await query(payment_query);
            console.log("------user_payment------ :", payment_query)

            console.log("------user_payment------ :", user_payment[0])

            if (user_payment.length > 0) {
                user_type = 'user'
            } else {
                user_type = 'guest'
            }

            // user table updation
            await query(`UPDATE users SET user_type= '${user_type}' WHERE id= ${req.user.id} `);

            // checking user type
            if (user_type === 'guest') {
                home = { heading: 'Hello , ' + 'Guest' }
                let courses = await query(`SELECT id, title, img_url FROM courses WHERE status=1`)
                if (courses.length > 0) {
                    home['courses'] = courses
                }
            } else {
                user_batch = await query(`SELECT bs.batch_id, b.batch_title, b.start_date
                                          FROM batch_student as bs
                                          LEFT JOIN batch as b
                                            ON b.id = bs.batch_id
                                          WHERE bs.user_id= ${user_id}  AND b.end_date > '${current_date}'
                                            `)

                home = {
                    heading: 'Hello , ' + req.user.user_name
                }

                if (user_batch.length > 0) {
                    home['message'] = {
                        title: 'Congratulations!',
                        // text: 'You have successfully subscribed for ' + row_transaction_packages[0].PKGS,
                        text: `Your are added to Batch: ${user_batch[0].batch_title} and starting date is ${user_batch[0].start_date}`,
                        bg_color: '#ffbc00',
                        url: ''
                    };
                } else {
                    home['message'] = {
                        title: 'Congratulations!',
                        // text: 'You have successfully subscribed for ' + row_transaction_packages[0].PKGS,
                        text: "Your payment is completed. You will be added to the batch soon.",
                        bg_color: '#ffbc00',
                        url: ''
                    };
                }
            }

            // master list
            instructor = await query(`SELECT i.id as instructor_id,i.name, i.description, i.img_url, c.title as course_name, c.id as course_id
            FROM instructors as i
            LEFT JOIN courses as c
                 ON c.id = i.course_id
            WHERE  i.status=1 LIMIT 3 `)

            if (instructor.length > 0) {
                home['masters'] = instructor;
            }

            // package list
            // if (user_type === 'guest') {
            packages = await query(`SELECT id, title, description, course_fee, course_duration_name, course_type ,img_url FROM packages WHERE status=1 `)
            // } else {
            //     packages = await query(`SELECT id, title, description, course_fee, course_duration_name, course_type ,img_url FROM packages WHERE status=1 AND course_id = ${user_course_id}`)
            // }

            if (packages.length > 0) {
                home['packages'] = packages;
            }

            // to get recommened package list
            let is_recommended_package_exist = await query(`SELECT id,course_id,package_type FROM recommended_package WHERE  user_id=${req.user.id}`)

            if (is_recommended_package_exist.length > 0) {
                recommended_packages = await query(`SELECT id, title, description, course_fee, course_duration_name, course_type ,img_url FROM packages WHERE status=1 AND course_type = '${is_recommended_package_exist[0].package_type}'`)

                if (recommended_packages.length > 0) {
                    home['recommended_packages'] = recommended_packages;
                }
            }

            // class list
            if (user_type === 'user') {
                // ongoing class list
                let date = moment().format('YYYY-MM-DD HH:mm:ss');

                select_query = `SELECT c.*, s.title as subject_title , 'ongoing_class' AS current_class_type 
                                FROM classes c
                                LEFT JOIN subjects s
                                ON s.subject_id = c.subject_id
                                WHERE c.class_type='Live' AND c.batch_id LIKE '%${user_batch[0].batch_id}%' AND (c.class_straming_date <= '${date}') AND (c.class_streaming_enddate >= '${date}')
                                ORDER BY c.class_straming_date ASC
								LIMIT 3                                
                                ;`

                ongoing_class_list = await query(select_query)

                if (ongoing_class_list.length > 0) {
                    home['ongoing_class'] = ongoing_class_list
                }


                // upcoming class

                let start_date = current_date + ' ' + '00:00:00'
                let end_date = current_date + ' ' + '23:59:59'

                select_query = `SELECT c.*, s.title as subject_title , 'upcoming_class' AS current_class_type 
                                FROM classes c
                                LEFT JOIN subjects s
                                ON s.subject_id = c.subject_id
                                WHERE  c.class_type='Live' AND c.batch_id LIKE '%${user_batch[0].batch_id}%'  AND (c.class_straming_date BETWEEN '${start_date}' AND '${end_date}')
                                ORDER BY c.class_straming_date ASC
								LIMIT 3
                                `;

                upcoming_class_list = await query(select_query)

                if (upcoming_class_list.length > 0) {
                    home['upcoming_class'] = upcoming_class_list
                }


                // missed class list
                select_query = `SELECT c.*, s.title as subject_title , 'missed_class' AS current_class_type 
                                FROM classes c
                                LEFT JOIN subjects s
                                ON s.subject_id = c.subject_id
                                WHERE  c.class_type='Video Tutorial' AND c.batch_id LIKE '%${user_batch[0].batch_id}%' 
                                ORDER BY c.class_straming_date ASC
                                LIMIT 3;
                                `;
                missed_class_list = await query(select_query)
                if (missed_class_list.length > 0) {
                    home['missed_class'] = missed_class_list
                }


                // subject list
                let user_course_id = await query(`SELECT course_id FROM packages WHERE id=${user_payment[0].package_id}`)
                select_query = `SELECT * FROM subjects WHERE course_id= ${user_course_id[0].course_id} AND package_id =${user_payment[0].package_id}`

                subject_list = await query(select_query)

                if (subject_list.length > 0) {
                    home['subjects'] = subject_list
                }


                // announcement list
                select_query = `SELECT * FROM announcements;`
                announcement_list = await query(select_query)

                if (announcement_list.length > 0) {
                    home['announcements'] = announcement_list
                }
            }


            //--- common for all -- success stories
            let success_stories = await query(`SELECT * FROM success_stories WHERE status=1 LIMIT 3`)
            if (success_stories.length > 0) {
                home['success_stories'] = success_stories
            }


            //--- common for all -- Testimonials
            let testimonials = await query(`SELECT id, name, review, review_title, review_type, img_url, rating FROM testimonials WHERE status=1 LIMIT 3`)
            if (testimonials.length > 0) {
                home['testimonials'] = testimonials
            }


            //--- common for all -- courses
            let courses = await query(`SELECT id, title, img_url FROM courses WHERE status=1`)
            if (courses.length > 0) {
                home['courses'] = courses
            }

            //--- common for all -- banners
            let banner = await query(`SELECT * FROM banner WHERE status=1`)
            if (banner.length > 0) {
                home['banner'] = banner
            }



            // know more -- Image -- Common for all
            home['know_more'] = 'https://eocnodedev.s3.ap-south-1.amazonaws.com/uploadImages/knowmore.png'


            return ({
                status: true,
                status_code: 202,
                message: 'home',
                result: home
            });
        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id is missing',
            result: []
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





//  to subscription order creation
exports.subscriptionOrderCreation = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id
        let current_date = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
        let voucher;
        let TotalFee;
        let transaction_type = 'cc';
        let is_voucher;

        if (user_id && req.body) {


            // need to check already package purchased
            let is_subscription = await query(`SELECT * FROM user_subscription WHERE user_id=${user_id} AND transaction_message='Success'`)

            //get package details
            let package = await query(`SELECT id, title, description, course_fee, course_duration, course_type ,img_url FROM packages WHERE status=1 AND id=${req.body.package_id}`)

            if (package.length === 0) {
                return ({
                    status: true,
                    status_code: 202,
                    message: 'Package doesnot exist',
                    result: []
                });
            }

            if (is_subscription.length > 0) {

                let days = parseInt(package[0].course_duration)
                let subscribed_date = is_subscription[0].transaction_date
                let expire_on = moment(subscribed_date).add(days, 'days').format('YYYY-MM-DD HH:mm:ss')

                if (current_date < expire_on) {
                    return ({
                        status: true,
                        status_code: 202,
                        message: 'You have already purchased a package',
                        result: []
                    });
                }

            }


            // Incorrect voucher code
            if (req.body.voucher_code != undefined) {
                voucher = await query(`select * from voucher where voucher_code='${req.body.voucher_code}' AND package_id =${req.body.package_id}`)
                if (voucher.length === 0) {
                    return ({
                        status: true,
                        status_code: 202,
                        message: 'Incorrect voucher code',
                        data: ""
                    });
                }

                if (voucher.length != 0) {
                    TotalFee = voucher[0].balance_amount
                    transaction_type = 'voucher'
                    is_voucher = true;
                }
            } else {
                TotalFee = package[0].course_fee;
                transaction_type = 'cc'
                is_voucher = false;
            }



            // amount condition checking
            if (parseInt(TotalFee) > 0) {

                // payment table insertion
                let insert_query = `INSERT INTO user_subscription(user_id, 
                package_id, 
                transaction_type,
                transaction_id,
                transaction_amount,
                transaction_status,
                transaction_message,
                created_on
                )
                VALUES(${user_id}, 
                    ${req.body.package_id}, 
                    '${transaction_type}',
                    'null',
                    ${TotalFee},
                    0,
                    'not completed',
                    '${current_date}'
                    )`

                let subscribe_insertion = await query(insert_query);

                // Razor pay order creation
                query_builder = {
                    amount: (parseInt(package[0].course_fee)) * 100,
                    currency: "INR",
                    receipt: subscribe_insertion.insertId// order id
                }

                let create_order = await Razorpay.createSubscriptionOrder(query_builder)

                // update paymnet table
                const update_user_query = `UPDATE user_subscription SET razorpay_id= '${create_order.id}' WHERE id=${subscribe_insertion.insertId};`
                await query(update_user_query);


                return ({
                    status: true,
                    status_code: 200,
                    message: "Order id created successfully.",
                    amount: parseInt(package[0].course_fee),
                    razorpay_id: create_order.id,
                    order_id: subscribe_insertion.insertId,
                    is_voucher: is_voucher
                });


            } else if (parseInt(TotalFee) === 0) {

                // payment table insertion
                let insert_query = `INSERT INTO user_subscription(user_id, 
                                    package_id, 
                                    transaction_type,
                                    transaction_id,
                                    transaction_amount,
                                    transaction_status,
                                    transaction_message,
                                    created_on
                                    )
                                    VALUES(${user_id}, 
                                        ${req.body.package_id}, 
                                        '${transaction_type}',
                                        'null',
                                        ${TotalFee},
                                        0,
                                        'Success',
                                        '${current_date}'
                                        )`

                let subscribe_insertion = await query(insert_query);

                return ({
                    status: true,
                    status_code: 200,
                    message: "Order id created successfully.",
                    amount: parseInt(package[0].course_fee),
                    razorpay_id: 0,
                    order_id: subscribe_insertion.insertId,
                    is_voucher: is_voucher
                });
            }


        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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



//  to subscription success payment
exports.subscriptionPayment = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id && req.body) {
            // update payment table
            const update_payment_query = `UPDATE user_subscription 
                                       SET transaction_id= '${req.body.transaction_id}',
                                       transaction_message= 'Success',
                                       transaction_status= 1,
                                       transaction_date= '${moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}'
                                       WHERE id=${req.body.order_id};`
            await query(update_payment_query);


            if (req.body.voucher_code != undefined || req.body.voucher_cod != null) {
                // voucher table updation
                await query(`UPDATE voucher SET payment_status = 1 WHERE voucher_code = '${req.body.voucher_code}'`)

            }



            // update user table 
            const update_user_query = `UPDATE users 
                                       SET user_type= 'user'
                                       WHERE id=${req.user.id};`
            await query(update_user_query);

            return ({
                status: true,
                status_code: 200,
                message: 'Payment completed successfully',
                result: []
            });

        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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

//  to subscription success payment
exports.subscriptionPaymentError = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id && req.body) {
            // update payment table
            const update_payment_query = `UPDATE user_subscription 
                                       SET transaction_id= '${req.body.transaction_id}',
                                       transaction_message= '${req.body.transaction_message}',
                                       transaction_status= 2,
                                       transaction_date= '${moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}'
                                       WHERE id=${req.body.order_id};`
            await query(update_payment_query);

            return ({
                status: true,
                status_code: 200,
                message: "Payment error is occured. Please try again",
                result: []
            });


        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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


//  to update user profile
exports.profileUpdate = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id && req.body) {
            // update payment table
            const update_user_query = `UPDATE users 
                                       SET user_name= '${req.body.user_name}',
                                       phone= '${req.body.phone}',
                                       email= '${req.body.email}',
                                       address1= '${req.body.address1}',
                                       address2= '${req.body.address2}',
                                       city_country= '${req.body.city_country}',
                                       zipcode= '${req.body.zipcode}',
                                       qualification= '${req.body.qualification}',
                                       campus_id= '${req.body.campus_id}',
                                       password= '${req.body.password}'
                                       WHERE id=${req.user.id};`
            await query(update_user_query);

            return ({
                status: true,
                status_code: 200,
                message: "User details updated successfully",
                result: []
            });


        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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

//  to update recommended Package
exports.recommendedPackage = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id && req.body) {
            let is_recommended = await query(`SELECT * FROM recommended_package WHERE user_id=${req.user.id} AND course_id=${req.body.course_id}`)

            if (is_recommended.length > 0) {
                // update recommend table
                const update_query = `UPDATE recommended_package 
                                           SET package_type= '${req.body.package_type}'
                                           WHERE user_id=${req.user.id} AND course_id=${req.body.course_id};`
                await query(update_query);
            } else {
                let insert_query = `INSERT INTO recommended_package(user_id, 
                                        course_id, 
                                        package_type
                                        )
                                        VALUES(${user_id}, 
                                        ${req.body.course_id}, 
                                        '${req.body.package_type}'
                                        )`

                await query(insert_query);
            }



            return ({
                status: true,
                status_code: 200,
                message: "Recommendation updated",
                result: []
            });


        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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

// voucher code validation
module.exports.voucher_code_validation = async (req, res) => {
    try {

        const query = util.promisify(connection.query).bind(connection);
        const package = await query(`select * from packages where status=1 AND course_fee=${req.body.amount} AND id=${req.body.package_id}`);
        const voucher = await query(`select * from voucher where voucher_code='${req.body.voucher_code}' AND package_id =${req.body.package_id}`)

        if (voucher.length === 0 || package.length === 0) {
            return ({
                status: true,
                status_code: 202,
                message: voucher.length === 0 ? "Voucher code does not exist" : "Package doest not exist",
            });
        }

        let localTime = moment.utc(voucher[0].created_on).toDate();
        let convertedTime = moment(localTime).format('YYYY-MM-DD');
        let currentTime = moment().format('YYYY-MM-DD');

        let daysCount = moment(currentTime).diff(convertedTime, 'days');

        if (voucher[0].expiry_days < daysCount) {
            return ({
                status: true,
                status_code: 202,
                message: "Voucher code does not exist"
            });
        }


        // console.log("-------voucher payment status------------ :", voucher[0].payment_status)
        if (voucher[0].payment_status === null || voucher[0].payment_status === "null") {
            let balanceAmount = (package[0].course_fee - voucher[0].amount)
            // console.log("--------balanceAmount-------- :", balanceAmount)
            const update_query = `
			UPDATE voucher
			SET user_id = ${req.body.user_id} ,
			balance_amount = ${balanceAmount}
			WHERE voucher_code = '${req.body.voucher_code}';
			`
            // to edit values to voucher table
            await query(update_query);
            return ({
                status: true,
                status_code: 200,
                message: `Voucher code validated. Now you can access the package : ${package[0].title} `,
                balance_amount: balanceAmount
            });
        }

        return ({
            status: true,
            status_code: 202,
            message: "Sorry ..this voucher code is not available."
        });

    } catch (error) {
        console.error(error);
        return ({
            status: false,
            status_code: 500,
            message: "Internal Server Error"
        });
    } finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);

    }
};



// to get testimonial list
exports.testimonials = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id) {
            let list = await query(`SELECT * FROM testimonials WHERE status=1 ORDER BY id DESC;`)

            if (list.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: "testimonials",
                    result: list
                });
            }

            return ({
                status: true,
                status_code: 202,
                message: "No data",
                result: []
            });


        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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

//  to get one testimonial
exports.getOneTestimonial = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id && req.params.id) {
            let list = await query(`SELECT * FROM testimonials WHERE status=1 AND id= ${req.params.id}`)

            if (list.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: "testimonials",
                    result: list
                });
            }

            return ({
                status: true,
                status_code: 202,
                message: "No data",
                result: []
            });


        }


        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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


// to get success_stories list
exports.success_stories = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id) {
            let list = await query(`SELECT * FROM success_stories WHERE status=1 ORDER BY id DESC;`)

            if (list.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: "success_stories",
                    result: list
                });
            }

            return ({
                status: true,
                status_code: 202,
                message: "No data",
                result: []
            });


        }

        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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


//  to get one sccess story
exports.getOneSuccessStories = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id && req.params.id) {
            let list = await query(`SELECT * FROM success_stories WHERE status=1 AND id= ${req.params.id}`)

            if (list.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: "success_stories",
                    result: list
                });
            }

            return ({
                status: true,
                status_code: 202,
                message: "No data",
                result: []
            });

        }

        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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

exports.instructorDetails = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id && req.params.id) {


            let list = await query(`SELECT i.id as instructor_id, i.name, i.description, i.img_url, c.title as course_name
                                            FROM instructors as i
                                            LEFT JOIN courses as c
                                                ON c.id = i.course_id
                                            WHERE i.id= ${req.params.id} 
                                            AND i.status=1`)


            // let list = await query(`SELECT * FROM instructors WHERE status=1 AND id= ${req.params.id}`)

            if (list.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: "success_stories",
                    result: list
                });
            }

            return ({
                status: true,
                status_code: 202,
                message: "No data",
                result: []
            });

        }

        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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



// to get announcements list
exports.announcements = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id

        if (user_id) {
            let list = await query(`SELECT * FROM announcements WHERE status=1 ORDER BY id DESC;`)

            if (list.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: "announcements",
                    result: list
                });
            }

            return ({
                status: true,
                status_code: 202,
                message: "No data",
                result: []
            });


        }

        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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


// to get class list
exports.class_list = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let user_id = req.user.id
        let select_query;

        if (user_id) {

            // to get user batch id
            let getBatch = await query(`select batch_id from batch_student where  user_id=${user_id}`);
            console.log("--- getBatch ----- :", getBatch[0].batch_id)


            if (req.body.class_type === 'ongoing') {
                let date = moment().format('YYYY-MM-DD HH:mm:ss');

                select_query = `SELECT c.*, s.title as subject_title FROM classes c
                                LEFT JOIN subjects s
                                ON s.subject_id = c.subject_id
                                WHERE c.class_type='Live' AND c.batch_id LIKE '%${getBatch[0].batch_id}%' AND (c.class_straming_date <= '${date}') AND (c.class_streaming_enddate >= '${date}');`

            } else if (req.body.class_type === 'upcoming') {

                // date checking
                if (!(req.body.date && req.body.date !== '')) {
                    return ({
                        status: true,
                        status_code: 202,
                        message: 'Date is required'
                    });
                }


                let current_date = moment().format('YYYY-MM-DD');

                if (req.body.date < current_date) {
                    return ({
                        status: true,
                        status_code: 202,
                        message: 'Please choose current or upcoming date'
                    });
                }

                let start_date = req.body.date + ' ' + '00:00:00'
                let end_date = req.body.date + ' ' + '23:59:59'

                select_query = `SELECT c.*, s.title as subject_title FROM classes c
                                LEFT JOIN subjects s
                                ON s.subject_id = c.subject_id
                                WHERE  c.class_type='Live' AND c.batch_id LIKE '%${getBatch[0].batch_id}%'  AND (c.class_straming_date BETWEEN '${start_date}' AND '${end_date}')`


            }

            let list = await query(select_query)

            if (list.length > 0) {
                return ({
                    status: true,
                    status_code: 200,
                    message: "class",
                    result: list
                });
            }

            return ({
                status: true,
                status_code: 202,
                message: "No class",
                result: []
            });


        }

        return ({
            status: true,
            status_code: 202,
            message: 'User id or params are missing',
            result: []
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