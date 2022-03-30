"use strict";
const nodemailer = require("nodemailer");
const emailConfig = require("../lib/email.config.js");

exports.sendSMTPMail = (email_data, result) => {
    (async () => {
        try {
            // let transporter = nodemailer.createTransport(emailConfig.smtp);
            // let info = await transporter.sendMail({
            //     from: '"'+email_data.from_name+'" <'+email_data.from_email+'>',
            //     to: email_data.to_email,
            //     subject: email_data.subject,
            //     amp: email_data.email_template
            // });
            // if(info){
                
            //     result(null, {
            //         ...{ message: "An email has been sent." }
            //     });
            //     return;
            // }
            result({ kind: "Error during email sent", message: "Error during email sent" }, null); return

            // console.log("Message sent: %s", info.messageId);
        } catch (err) {
            if (err) {
                result(null, err);
                return;
            }
        }
    })()
}
