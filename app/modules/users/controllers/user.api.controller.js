const userService = require("../services/user.service.js");
const authService = require('../../../services/auth.handler.js');



// //lilst nearby vendors
// exports.homePage = async (req, res) => {
//   try {

//     const result = await userService.homePage(req)
//     res.status(result.status).send(result);

//   } catch (error) {
//     console.error(error);
//     res.status(400).send({
//       success_status: false, message: error
//     });
//   }
// };

// generate otp
exports.generateOtp = async (req, res) => {
    try {

        const result = await userService.generateOtp(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// otp - verification
exports.otpVerification = async (req, res) => {
    try {

        const result = await userService.otpVerification(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// login
exports.checkLogin = async (req, res) => {
    try {

        const result = await userService.checkLogin(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};


// for email verification otp genenration
exports.emailOtpGeneration = async (req, res) => {
    try {

        const result = await userService.emailOtpGeneration(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// for email otp verification 
exports.emailOtpVerification = async (req, res) => {
    try {

        const result = await userService.emailOtpVerification(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};