const express = require('express')
const controller = require('../controller/adminuser.controller')
const router = express('Router');




router.route('/api/classlist').get(controller.getalladminusers);


/** 
* @swagger
*
* /api/classlist:
*   get:
*     description:
*       - getting the classlist
*     summary: Use to get classlist
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


router.route('/api/add-adminuser').post(controller.createnewadminusers);
/** 
* @swagger
*
* /api/add-adminuser:
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

