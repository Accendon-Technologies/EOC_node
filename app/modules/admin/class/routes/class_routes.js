const express = require('express')
const controller = require('../controller/adminuser.controller')
const router = express('Router');




router.route('/api/classlist').get(controller.getallclass);


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


router.route('/api/add-class').post(controller.createclass);
/** 
* @swagger
*
* /api/add-class:
*   post:
*     description:
*       - adding the class
*     summary: Use to add class
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
*       - name: Exam 
*         in: formData
*         required: true
*         type: string
*         example:
*          FirstName: ghjjk
* 
*       - name: Package
*         in: formData
*         required: true
*         type: string
*         example:
*          Lastname: jkl
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

