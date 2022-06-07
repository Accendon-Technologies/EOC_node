const express = require('express')
const controller = require('../controller/adminuser.controller')
const router = express('Router');




router.route('/api/adminuserlist').get(controller.getalladminusers);


/** 
* @swagger
*
* /api/adminuserlist:
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





router.route('/api/delete-adminuser/:id').delete(controller.deleteadminusers)
/** 
* @swagger
*
* /api/delete-adminuser/:id:
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
*       - in: query
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





router.route('/api/edit-adminuser/:id').put(controller.updateadminusers)
/** 
* @swagger
*
* /api/edit-adminuser/:id:
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
*         in: query
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
*       - name: profilephoto
*         in: formData
*         required: true
*         type: string
*         example:
*          profilephoto: we.jpg

*     responses:
*         200:
*           description:Success
*/

router.route('/api/getone-adminuser/:id').get(controller.getoneadminusers);

/** 
* @swagger
*
* /api/getone-adminuser/:id:
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

*       - in: query
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

