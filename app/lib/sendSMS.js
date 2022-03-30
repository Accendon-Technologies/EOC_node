// "use strict";
// const curl = require("curl");
// const apiKey = "491+6BC2Vjs-lArKQFMqfHl3ugMMbPtuQhkW3mV2Jh";
// const sender = "EPSSAA"
// var msg = ""

// var https = require('https');

// module.exports.sendTextLocalSMS = async (info) => {
//     try {
//         var input = JSON.parse(JSON.stringify(info));

//         const sendSms = await https.get("https://api.textlocal.in/send/?sender=EPSSAA&message=Dear%20User%2C%0A%20%0AYour%20OTP%20for%20login%20to%20EPSSA%20SERVICE%20%26%20MAINTENANCE%20APP%20is%20" + info.otp + ".%20Please%20do%20not%20share%20this%20OTP%0ARegards%0AEPSSA%20Team&numbers=9995116381&apikey=491+6BC2Vjs-lArKQFMqfHl3ugMMbPtuQhkW3mV2Jh&numbers=" + input.phone + "&apikey=" + apiKey)

//         // var data = JSON.parse(test);
//         return sendSms
//     } catch (error) {
//         console.log("----- error ----- :", error)
//         return error
//     }
// }


"use strict";

var sender = "CAMPUZ"

var https = require('https');

module.exports.sendSMS2 = async (info) => {
    try {
        var apiKey = "viQqu7lo6cE-JVgMwldk83udrZBbZkxXV7PA6VvgKl";

        /*=============Don't do any formattings here - Then it won't work ========*/
        var msg = 'Dear Student,\n' +
            'Your OTP for login to the CAMPUS EXAM PREPARATION APP is <OTP/> Please do\n' +
            'not share this OTP.\n' +
            'Regards\n' +
            'Team Campus.';
        /*========================================================================*/
        msg = encodeURIComponent(msg.replace('<OTP/>', info.otp));

        var input = JSON.parse(JSON.stringify(info));


        await https.get("https://api.textlocal.in/send/?sender=CAMPUZ&message=Dear%20Student%2C%0AYour%20OTP%20for%20login%20to%20the%20CAMPUS%20EXAM%20PREPARATION%20APP%20is%20" + info.otp + "%20Please%20do%0Anot%20share%20this%20OTP.%0ARegards%0ATeam%20Campus.&numbers=" + input.phone + "&apikey=" + apiKey, (res) => {
            res.on('data', (d) => {
                console.log("----- data ----- :", data)
                var data = JSON.parse(d);
                console.log('data:', data);
                if (data.status == 'success') {
                    return "successfully msg send"
                } else {
                    return 'Unable to sent OTP'
                }
            });

        }).on('error', (e) => {
            console.error(e);

            return e
        });

        return "sendSms"
    } catch (error) {
        console.log("----- error ----- :", error)
        return error
    }
}

