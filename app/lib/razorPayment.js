"use strict";
const curl = require("curl");
const keyId = "";
const secretkey = ""
var msg = ""


var moment = require('moment')

// console.log("-----process.env.NODE_APP_STAGE ---- :", process.env.NODE_APP_STAGE)
var Razorpay = require("razorpay");
// var instance;
// var key_id;
// var key_secret;


var instance = new Razorpay({
    key_id: 'rzp_test_5Tk4Jf9pKv5PSI',
    key_secret: 'GqxeUEiFFr1Gxh9zUnDKICXR',
});
var key_id = "rzp_test_5Tk4Jf9pKv5PSI";
var key_secret = "GqxeUEiFFr1Gxh9zUnDKICXR";


exports.createSubscriptionOrder = async (info) => {
    try {
        const result = await instance.orders.create(info);
        return result

    } catch (err) {
        console.log("------ err ------ :", err);
        res.send({ response: err });
    }
};