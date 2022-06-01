const express = require('express')
const controller = require('../controller/students.controller')
const services = require('../services/students.services')
const router = express('Router');




router.route('/api/adminusers/adminuserlist').get(controller.get_student);


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


router.route('/api/adminusers/add-adminuser').post(controller.create_student);
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
*       - name: FirstName 
*         in: formData
*         required: true
*         type: string
*         example:
*          FirstName: Beena
* 
*       - name: LastName
*         in: formData
*         required: true
*         type: string
*         example:
*          Lastname: Babu
* 
*       - name: Email
*         in: formData
*         required: true
*         type: string
*         example:
*          Email: adminusers12@gmail.com
* 
*       - name: PhoneNumber
*         in: formData
*         required: true
*         type: string
*         example:
*          PhoneNumber: 9823456712
* 
*       - name: Username
*         in: formData
*         required: true
*         type: string
*         example:
*          Username: beena345
*
*       - name: Password
*         in: formData
*         required: true
*         type: string
*         example:
*          Password: Beena1345^babu

*       - name: UserType
*         in: formData
*         required: true
*         type: string
*         example:
*          UserType: Teacher
*
*       - name: Subject
*         in: formData
*         required: true
*         type: string
*         example:
*          Subject: English

*       - name: AboutInstructor
*         in: formData
*         required: true
*         type: string
*         example:
*          AboutInstructor:  A primary school teacher with over seven years of experience as a English Teacher.
*     responses:
*         200:
*           description:Success
*/





router.route('/api/adminusers/delete-adminuser/:id').delete(controller.delete_student)
/** 
* @swagger
*
* /api/adminusers/delete-adminuser/:id:
*   delete:
*     description:
*       - deleting the admin user
*     summary: Use to delete admin-user
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





router.route('/api/adminusers/admin-edit/:id').put(controller.update_student)
/** 
* @swagger
*
* /api/adminusers/admin-edit/:id:
*   put:
*     description:
*       - updating the detils admin users
*     summary: Use to update details of admin-users
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

*       - name: id
*         in: formData
*         required: true
*         type: string
*         example:
*          id: 65
* 

* 
*       - name: FirstName 
*         in: formData
*         required: true
*         type: string
*         example:
*          FirstName: Beena
* 
*       - name: LastName
*         in: formData
*         required: true
*         type: string
*         example:
*          Lastname: Babu
* 
*       - name: Email
*         in: formData
*         required: true
*         type: string
*         example:
*          Email: adminusers12@gmail.com
* 
*       - name: PhoneNumber
*         in: formData
*         required: true
*         type: string
*         example:
*          PhoneNumber: 9823456712
* 
*       - name: Username
*         in: formData
*         required: true
*         type: string
*         example:
*          Username: beena345
*
*       - name: Password
*         in: formData
*         required: true
*         type: string
*         example:
*          Password: Beena1345^babu

*       - name: UserType
*         in: formData
*         required: true
*         type: string
*         example:
*          UserType: Teacher
*
*       - name: Subject
*         in: formData
*         required: true
*         type: string
*         example:
*          Subject: English

*       - name: AboutInstructor
*         in: formData
*         required: true
*         type: string
*         example:
*          AboutInstructor:  A primary school teacher with over seven years of experience as a English Teacher.
*     responses:
*         200:
*           description:Success
*/

router.route('/api/adminusers/getone-adminuser/:id').get(controller.getOne_student);

/** 
* @swagger
*
* /api/adminusers/getone-adminuser/:id:
*   get:
*     description:
*       - getone the admin user
*     summary: Use to getone admin-user
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

*       - in: path
*         name: id
*         required: true
*         type: integer
*         example:
*          id: 45
* 

*     responses:
*         200:
*           description:Success
*/





module.exports = router

