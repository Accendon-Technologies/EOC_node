const express = require('express')
const controller = require('../controller/admin.user.controller')
const router = express('Router');

router.route('/api/adminusers/get-alladminusers').get(controller.getalladminusers);


/** 
* @swagger
*
* /api/adminusers/get-alladminusers:
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


router.route('/api/adminusers/create-adminusers').post(controller.createnewadminusers);
/** 
* @swagger
*
* /api/adminusers/create-adminusers:
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
*          Password:  A primary school teacher with over seven years of experience as a English Teacher.
*     responses:
*         200:
*           description:Success
*/

router.route('/app/adminusers/delete-adminuser/:id').delete(controller.deleteadminusers)


router.route('/app/adminusers/edit-adminuser/:id').put(controller.updateadminusers)

// router.route('/app/adminusers/getone-adminuser/:select').get(controller.getoneadminusers);
module.exports = router

