module.exports = app => {

  const usersApi = require("../controllers/user.api.controller.js");
  const authService = require('../../../services/auth.handler.js');



  app.post("/api/users/generate-otp", usersApi.generateOtp);
  /**
  * @swagger
  *
  * /api/users/generate-otp:
  *   post:
  *     description:
  *       - Use to login
  *     tags:
  *       - User Module
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Content-Type
  *         type: string
  *         value: application/x-www-form-urlencoded
  *         required: true
  * 
  *       - name: phone
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          phone:  12456789
  * 
  *       - name: type
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          type: forgot-pwd or generate-otp
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.post("/api/users/otp-verification", usersApi.otpVerification);
  /**
  * @swagger
  *
  * /api/users/otp-verification:
  *   post:
  *     description:
  *       - Use to login
  *     tags:
  *       - User Module
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Content-Type
  *         type: string
  *         value: application/x-www-form-urlencoded
  *         required: true
  * 
  *       - name: phone
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          phone:  12456789
  * 
  *       - name: otp
  *         in: formData
  *         required: true
  *         type: integer
  *         example:
  *          otp: 1234 or use the correct OTP value
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.post("/api/users/login", usersApi.checkLogin);
  /**
  * @swagger
  *
  * /api/users/login:
  *   post:
  *     description:
  *       - Use to login
  *     tags:
  *       - User Module
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Content-Type
  *         type: string
  *         value: application/x-www-form-urlencoded
  *         required: true
  * 
  *       - name: phone
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          phone: 123456789
  * 
  *       - name: password
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          password:123
  * 
  *     responses:
  *         200:
  *           description:Success
  */



  app.post("/api/users/email-otp-generation", usersApi.emailOtpGeneration);
  /**
  * @swagger
  *
  * /api/users/email-otp-generation:
  *   post:
  *     description:
  *       - Use to login
  *     tags:
  *       - User Module
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Content-Type
  *         type: string
  *         value: application/x-www-form-urlencoded
  *         required: true
  * 
  *       - name: email
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          email: divya@gmail.com
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.post("/api/users/email-otp-verification", usersApi.emailOtpVerification);
  /**
  * @swagger
  *
  * /api/users/email-otp-verification:
  *   post:
  *     description:
  *       - Use to login
  *     tags:
  *       - User Module
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Content-Type
  *         type: string
  *         value: application/x-www-form-urlencoded
  *         required: true
  * 
  *       - name: email
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          email: divya@gmail.com
  * 
  *       - name: otp
  *         in: formData
  *         required: true
  *         type: integer
  *         example:
  *          otp: 1234
  * 
  *     responses:
  *         200:
  *           description:Success
  */



};


