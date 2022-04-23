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

// reset- password
exports.resetPassword = async (req, res) => {
    try {

        const result = await userService.resetPassword(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};


// to get user profile 
exports.getProfile = async (req, res) => {
    try {

        const result = await userService.getProfile(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};


// to get course List
exports.courseList = async (req, res) => {
    try {

        const result = await userService.courseList(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};


// to get package List
exports.packageList = async (req, res) => {
    try {

        const result = await userService.packageList(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to get package details
exports.packageDetails = async (req, res) => {
    try {

        const result = await userService.packageDetails(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to get instructor list
exports.instructorList = async (req, res) => {
    try {

        const result = await userService.instructorList(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to get home page
exports.home = async (req, res) => {
    try {

        const result = await userService.home(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to subscription order creation
exports.subscriptionOrderCreation = async (req, res) => {
    try {

        const result = await userService.subscriptionOrderCreation(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to subscription successfull payment
exports.subscriptionPayment = async (req, res) => {
    try {

        const result = await userService.subscriptionPayment(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to subscription  payment error
exports.subscriptionPaymentError = async (req, res) => {
    try {

        const result = await userService.subscriptionPaymentError(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to update user profile
exports.profileUpdate = async (req, res) => {
    try {

        const result = await userService.profileUpdate(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// to recommended Package
exports.recommendedPackage = async (req, res) => {
    try {

        const result = await userService.recommendedPackage(req, res)
        return res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};