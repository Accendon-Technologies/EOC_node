var connection = require('../../../config/db.config').connection;
var util = require('util');

var SMS = require("../../../lib/sendSMS"); // to send SMS

var Razorpay = require('../../../lib/razorPayment')

// to get time
// var moment = require('moment')
const moment = require('moment-timezone');


// voucher code generation
module.exports.voucher_code_generation = async (req, res) => {
    try {

        const query = util.promisify(connection.query).bind(connection);

        if (req.body) {
            const obj = req.body;

            let date = moment().utc().format('YYYY-MM-DD HH:mm:ss')
            console.log("===== date ------ :", date)
            for (let i = 0; i < obj.voucher_key_no; i++) {
                let voucher_code = Math.random().toString(36).slice(-obj.voucher_key_length);
                let insert_query = `INSERT INTO voucher(package_id,amount,voucher_code,expiry_days,status, created_on)
				VALUES(${parseInt(obj.package_id)}, ${obj.amount}, '${voucher_code}',${obj.expiry_days},1, '${date}')`

                // to insert values to voucher table
                await query(insert_query);
            }
            return ({
                status: true,
                status_code: 200,
                message: "Voucher Code Generated Successfully"
            });
        }
        return ({
            status: true,
            status_code: 202,
            message: "Params missing"
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


// voucher code updation
module.exports.voucher_code_updation = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        if (req.params.id && req.body) {
            const update_query = `
			UPDATE voucher
			SET package_id = ${req.body.package_id}, amount= ${req.body.amount}, expiry_days=${req.body.expiry_days}
			WHERE id = ${req.params.id};
			`

            // to edit values to voucher table
            await query(update_query);

            return ({
                status: true,
                status_code: 200,
                message: "Voucher Code Updated Successfully"
            });
        }
        return ({
            status: true,
            status_code: 202,
            message: "Params missing"
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