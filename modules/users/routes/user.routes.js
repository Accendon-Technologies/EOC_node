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
  *    
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
  *       - name: user_name
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          user_name: Varun
  * 
  *       - name: email
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          email: varun@gmail.com
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

  app.post("/api/users/reset-password", usersApi.resetPassword);
  /**
  * @swagger
  *
  * /api/users/reset-password:
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
  *       - name: new_password
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          new_password: 1234
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.get("/api/users/get-profile", authService.validateToken, usersApi.getProfile);
  /**
  * @swagger
  *
  * /api/users/get-profile:
  *   get:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.get("/api/users/courses", authService.validateToken, usersApi.courseList);
  /**
  * @swagger
  *
  * /api/users/courses:
  *   get:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.get("/api/users/package-list", authService.validateToken, usersApi.packageList);
  /**
  * @swagger
  *
  * /api/users/package-list:
  *   get:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  * 
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.get("/api/users/package-details/:id", authService.validateToken, usersApi.packageDetails);
  /**
  * @swagger
  *
  * /api/users/package-details/{id}:
  *   get:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  *       - in: path
  *         name: id   # Note the name is the same as in the path
  *         required: true
  *         type: integer
  *         minimum: 1
  *         description: eg- 1 
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.get("/api/users/instructor-list", authService.validateToken, usersApi.instructorList);
  /**
  * @swagger
  *
  * /api/users/instructor-list:
  *   get:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */



  app.get("/api/users/instructor/:id", authService.validateToken, usersApi.instructorDetails);
  /**
  * @swagger
  *
  * /api/users/instructor/{id}:
  *   get:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  *       - in: path
  *         name: id   # Note the name is the same as in the path
  *         required: true
  *         type: integer
  *         minimum: 1
  *         description: eg- 1 
  * 
  *     responses:
  *         200:
  *           description:Success
  */



  app.post("/api/users/home", authService.validateToken, usersApi.home);
  /**
  * @swagger
  *
  * /api/users/home:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */

  app.post("/api/users/subscription/order-creation", authService.validateToken, usersApi.subscriptionOrderCreation);
  /**
  * @swagger
  *
  * /api/users/subscription/order-creation:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  *       - name: package_id
  *         in: formData
  *         required: true
  *         type: integer
  *         example:
  *          package_id: 1
  * 
  *       - name: voucher_code
  *         in: formData
  *         required: false
  *         type: string
  *         example:
  *          voucher_code: 31so
  * 
  * 
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.post("/api/users/subscription/transaction-success", authService.validateToken, usersApi.subscriptionPayment);
  /**
  * @swagger
  *
  * /api/users/subscription/transaction-success:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  *       - name: order_id
  *         in: formData
  *         required: true
  *         type: integer
  *         example:
  *          order_id: 1
  * 
  *       - name: transaction_id
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          transaction_id: sri9pf
  * 
  *       - name: voucher_code
  *         in: formData
  *         required: false
  *         type: string
  *         example:
  *          voucher_code: 31so
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.post("/api/users/subscription/transaction-error", authService.validateToken, usersApi.subscriptionPaymentError);
  /**
  * @swagger
  *
  * /api/users/subscription/transaction-error:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  *       - name: order_id
  *         in: formData
  *         required: true
  *         type: integer
  *         example:
  *          order_id: 1
  * 
  *       - name: transaction_message
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          transaction_message: reason
  * 
  *     responses:
  *         200:
  *           description:Success
  */


  app.post("/api/users/profile-update", authService.validateToken, usersApi.profileUpdate);
  /**
  * @swagger
  *
  * /api/users/profile-update:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  * 
  *       - name: user_name
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          user_name: Roy
  * 
  *       - name: phone
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          phone: 112333446
  * 
  *       - name: email
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          email: test@gmail.com
  * 
  *       - name: address1
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          address1: 112333446
  * 
  *       - name: address2
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          address2: test@gmail.com
  * 
  * 
  *       - name: city_country
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          city_country: Kochi, India
  * 
  *       - name: zipcode
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          zipcode: 673008
  * 
  *       - name: qualification
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          qualification: Btech
  * 
  * 
  *       - name: campus_id
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          campus_id: test@123
  * 
  *       - name: password
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          password: 123
  * 
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */

  app.post("/api/users/recommended-package", authService.validateToken, usersApi.recommendedPackage);
  /**
  * @swagger
  *
  * /api/users/recommended-package:
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
  *       - in: header
  *         name: Authorization
  *         type: string
  *         required: true
  *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
  * 
  * 
  *       - name: course_id
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          course_id: Roy
  * 
  *       - name: package_type
  *         in: formData
  *         required: true
  *         type: string
  *         example:
  *          package_type: Advance or Beginner or Intermediate
  * 
  * 
  * 
  *     responses:
  *         200:
  *           description:Success
  */

  app.post("/api/users/voucher-code/validation", authService.validateToken, usersApi.voucher_code_validation);
  /**
   * @swagger
   *
   * /api/users/voucher-code/validation:
   *   post:
   *     description:
   *       - Use to validate voucher code
   * 
   *     summary: Use to validate voucher code
   * 
   *     tags:
   *        - User Module
   *     parameters:
   *       - in: header
   *         name: Content-Type
   *         type: string
   *         value: application/x-www-form-urlencoded
   *         required: true
   * 
   *       - in: header
   *         name: Authorization
   *         type: string
   *         required: true
   *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
   * 
   * 
   *       - name: user_id
   *         in: formData
   *         required: true
   *         type: integer
   *         example:
   *          user_id:1
   * 
   * 
   *       - name: package_id
   *         in: formData
   *         required: true
   *         type: integer
   *         example:
   *          package_id:1
   * 
   *       - name: amount
   *         in: formData
   *         required: true
   *         type: integer
   *         example:
   *          amount: 1500 (package amount)
   * 
   * 
   *       - name: voucher_code
   *         in: formData
   *         required: true
   *         type: string
   *         example:
   *          voucher_code: sri9pf
   * 
   *     produces:
   *       - application/json
   *     responses:
   *         200:
   *           description:Success
   */


  app.get("/api/users/testimonials", authService.validateToken, usersApi.testimonials);
  /**
   * @swagger
   *
   * /api/users/testimonials:
   *   get:
   *     description:
   *       - Use to validate voucher code
   * 
   *     summary: Use to list testimonials
   * 
   *     tags:
   *        - User Module
   *     parameters:
   *       - in: header
   *         name: Content-Type
   *         type: string
   *         value: application/x-www-form-urlencoded
   *         required: true
   * 
   *       - in: header
   *         name: Authorization
   *         type: string
   *         required: true
   *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
   * 
   * 
   *     produces:
   *       - application/json
   *     responses:
   *         200:
   *           description:Success
   */

  app.get("/api/users/testimonial/:id", authService.validateToken, usersApi.getOneTestimonial);
  /**
   * @swagger
   *
   * /api/users/testimonial/{id}:
   *   get:
   *     description:
   *       - Use to validate voucher code
   * 
   *     summary: Use to get one testimonial
   * 
   *     tags:
   *        - User Module
   *     parameters:
   *       - in: header
   *         name: Content-Type
   *         type: string
   *         value: application/x-www-form-urlencoded
   *         required: true
   * 
   *       - in: header
   *         name: Authorization
   *         type: string
   *         required: true
   *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
   * 
   * 
   *       - in: path
   *         name: id   # Note the name is the same as in the path
   *         required: true
   *         type: integer
   *         minimum: 1
   *         description: eg- 1 
   * 
   * 
   *     produces:
   *       - application/json
   *     responses:
   *         200:
   *           description:Success
   */



  app.get("/api/users/success-stories", authService.validateToken, usersApi.success_stories);
  /**
   * @swagger
   *
   * /api/users/success-stories:
   *   get:
   *     description:
   *       - Use to validate voucher code
   * 
   *     summary: Use to list success-stories
   * 
   *     tags:
   *        - User Module
   *     parameters:
   *       - in: header
   *         name: Content-Type
   *         type: string
   *         value: application/x-www-form-urlencoded
   *         required: true
   * 
   *       - in: header
   *         name: Authorization
   *         type: string
   *         required: true
   *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
   * 
   * 
   *     produces:
   *       - application/json
   *     responses:
   *         200:
   *           description:Success
   */


  app.get("/api/users/success-stories/:id", authService.validateToken, usersApi.getOneSuccessStories);
  /**
   * @swagger
   *
   * /api/users/success-stories/{id}:
   *   get:
   *     description:
   *       - Use to validate voucher code
   * 
   *     summary: Use to get one success-stories
   * 
   *     tags:
   *        - User Module
   *     parameters:
   *       - in: header
   *         name: Content-Type
   *         type: string
   *         value: application/x-www-form-urlencoded
   *         required: true
   * 
   *       - in: header
   *         name: Authorization
   *         type: string
   *         required: true
   *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
   * 
   * 
   *       - in: path
   *         name: id   # Note the name is the same as in the path
   *         required: true
   *         type: integer
   *         minimum: 1
   *         description: eg- 1 
   * 
   * 
   *     produces:
   *       - application/json
   *     responses:
   *         200:
   *           description:Success
   */

  app.get("/api/users/announcements", authService.validateToken, usersApi.announcements);
  /**
   * @swagger
   *
   * /api/users/announcements:
   *   get:
   *     description:
   *       - Use to validate voucher code
   * 
   *     summary: Use to list announcements
   * 
   *     tags:
   *        - User Module
   *     parameters:
   *       - in: header
   *         name: Content-Type
   *         type: string
   *         value: application/x-www-form-urlencoded
   *         required: true
   * 
   *       - in: header
   *         name: Authorization
   *         type: string
   *         required: true
   *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
   * 
   * 
   *     produces:
   *       - application/json
   *     responses:
   *         200:
   *           description:Success
   */


  app.post("/api/users/class", authService.validateToken, usersApi.class_list);
  /**
   * @swagger
   *
   * /api/users/class:
   *   post:
   *     description:
   *       - Use to validate voucher code
   * 
   *     summary: Use to get class
   * 
   *     tags:
   *        - User Module
   *     parameters:
   *       - in: header
   *         name: Content-Type
   *         type: string
   *         value: application/x-www-form-urlencoded
   *         required: true
   * 
   *       - in: header
   *         name: Authorization
   *         type: string
   *         required: true
   *         description: eg- OTA1NDg2OTM1MQ==  (user auth token)
   * 
   * 
   *       - name: class_type
   *         in: formData
   *         required: true
   *         type: string
   *         example:
   *          class_type: ongoing or upcoming
   * 
   *       - name: date
   *         in: formData
   *         required: false
   *         type: string
   *         example:
   *          date: 2022-05-16
   * 
   * 
   *     produces:
   *       - application/json
   *     responses:
   *         200:
   *           description:Success
   */


};


