const express = require('express')
const controller = require('../controller/Batch.controller')
const router = express('Router');




router.route('/api/adminusers/allbatch').get(controller.get_batch);


/** 
* @swagger
*
* /api/adminusers/adminuserlist:
*   get:
*     description:
*       - getting the admin users
*     summary: Use to get admin-users
*     tags:
*       - Admin-user Module
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: Content-Type
*         type: string
*         value: application/x-www-form-urlencoded
*         required: true
* 
*     responses:
*         200:
*           description:Success
*/


router.route('/api/adminusers/addbatch').post(controller.create_Batch);
/** 
* @swagger
*
* /api/adminusers/add-adminuser:
*   post:
*     description:
*       - adding the admin users
*     summary: Use to add admin-users
*     tags:
*       - Admin-user Module
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: Content-Type
*         type: string
*         value: application/x-www-form-urlencoded
*         required: true


* 
*       - name: Package 
*         in: formData
*         required: true
*         type: string
*         example:
*          Package: 
* 
*       - name: Title
*         in: formData
*         required: true
*         type: string
*         example:
*          Title: 
* 
*       - name: Date
*         in: formData
*         required: true
*         type: string
*         example:
*          Date: 23-05-2022
* 
*       - name: Start_Date
*         in: formData
*         required: true
*         type: string
*         example:
*          Start_Date: 25-06-2022
* 
*       - name: End_Date
*         in: formData
*         required: true
*         type: string
*         example:
*          End_Date: 15-12-2022
*
*       - name: Description
*         in: formData
*         required: true
*         type: string
*         example:
*          Description: 

*     responses:
*         200:
*           description:Success
*/





router.route('/api/adminusers/delete-batch/:id').delete(controller.delete_Batch)
/** 
* @swagger
*
* /api/adminusers/delete-adminuser/:id:
*   delete:
*     description:
*       - deleting the Batch
*     summary: Use to delete Batch
*     tags:
*       - Batch Module
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: Content-Type
*         type: string
*         value: application/x-www-form-urlencoded
*         required: true


* 
*       - name: id
*         in: formData
*         required: true
*         type: integer
*         example:
*          id: 45
* 

*     responses:
*         200:
*           description:Success
*/





// router.route('/api/adminusers/admin-edit/:id').put(controller.updateadminusers)
// /** 
// * @swagger
// *
// * /api/adminusers/admin-edit/:id:
// *   put:
// *     description:
// *       - updating the detils admin users
// *     summary: Use to update details of admin-users
// *     tags:
// *       - Admin-user Module
// *     produces:
// *       - application/json
// *     parameters:
// *       - in: header
// *         name: Content-Type
// *         type: string
// *         value: application/x-www-form-urlencoded
// *         required: true

// *       - name: id
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          id: 65
// * 

// * 
// *       - name: FirstName 
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          FirstName: Beena
// * 
// *       - name: LastName
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          Lastname: Babu
// * 
// *       - name: Email
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          Email: adminusers12@gmail.com
// * 
// *       - name: PhoneNumber
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          PhoneNumber: 9823456712
// * 
// *       - name: Username
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          Username: beena345
// *
// *       - name: Password
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          Password: Beena1345^babu

// *       - name: UserType
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          UserType: Teacher
// *
// *       - name: Subject
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          Subject: English

// *       - name: AboutInstructor
// *         in: formData
// *         required: true
// *         type: string
// *         example:
// *          AboutInstructor:  A primary school teacher with over seven years of experience as a English Teacher.
// *     responses:
// *         200:
// *           description:Success
// */

// router.route('/api/adminusers/getone-adminuser/:id').get(controller.getoneadminusers);

// /** 
// * @swagger
// *
// * /api/adminusers/getone-adminuser/:id:
// *   get:
// *     description:
// *       - getone the admin user
// *     summary: Use to getone admin-user
// *     tags:
// *       - Admin-user Module
// *     produces:
// *       - application/json
// *     parameters:
// *       - in: header
// *         name: Content-Type
// *         type: string
// *         value: application/x-www-form-urlencoded
// *         required: true

// *       - in: path
// *         name: id
// *         required: true
// *         type: integer
// *         example:
// *          id: 45
// * 

// *     responses:
// *         200:
// *           description:Success
// */

router.route('/api/adminusers/addstudentbatch').get(controller.add_student_batch)



module.exports = router

