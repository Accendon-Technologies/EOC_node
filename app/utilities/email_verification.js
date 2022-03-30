var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
    });
};


smtpTransport = nodemailer.createTransport(smtpTransport({
    // host: "smtpout.secureserver.net",
    // host: "https://mail.campus.study",

    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    port: 465,
    debug: true,

    // auth: {
    //     user: 'info@campus.study',
    //     pass: 'campus@info20'
    // }

    auth: {
        user: 'info@epssa.in',
        pass: 'Epssa@123'
    }
}));

module.exports.sendEmails = async (data) => new Promise(async (resolve, rejects) => {
    try {

        readHTMLFile(__dirname + '/views/email_verification.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                username: data.username,
                otp: data.otp
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'info@epssa.in',
                to: data.email,
                subject: 'Email Verification',
                html: htmlToSend
            };

            // console.log("----- mailOptions ----- :", mailOptions)

            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    rejects(error);
                } else {
                    console.log("============= email send ========= :")
                    resolve("Email send")
                }
            });

        });
    } catch (error) {
        console.error("---------------", error);
    }
});
