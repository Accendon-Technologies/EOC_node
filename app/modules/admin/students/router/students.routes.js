const express = require('express')
const controller = require('../controller/students.controller')
const services = require('../services/students.services')
const router = express('Router');




router.route('/api/studentslist').get(controller.get_student);


/** 
* @swagger
*
* /api/studentslist:
*   get:
*     description:
*       - getting the student
*     summary: Use to get student
*     tags:
*       - students Module
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


router.route('/api/add-student').post(controller.create_student);
/** 
* @swagger
*
* /api/add-student:
*   post:
*     description:
*       - adding the student details
*     summary: Use to add student
*     tags:
*       - students Module
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
* 
*       - name: AddressLine1
*         in: formData
*         required: true
*         type: string
*         example:
*          AddressLine1: balabhavanam,vallikunnam,vallikunnam.p.o

*       - name: AddressLine2
*         in: formData
*         required: true
*         type: string
*         example:
*          AddressLine2: balabhavanam,vallikunnam,vallikunnam.p.o

*       - name: CityorCountry
*         in: formData
*         required: true
*         type: string
*         example:
*          CityorCountry: Kayamkulam

*       - name: Zip_Code
*         in: formData
*         required: true
*         type: string
*         example:
*          Zip_code: 690504

*       - name: PhoneNumber
*         in: formData
*         required: true
*         type: string
*         example:
*          PhoneNumber: 9823456712

*       - name: Email
*         in: formData
*         required: true
*         type: string
*         example:
*          Email: adminusers12@gmail.com

*       - name: Email_Verification_status
*         in: formData
*         required: true
*         type: string
*         example:
*          Email_Verification_status: verified/not-verified

*       - name: Qualifiaction
*         in: formData
*         required: true
*         type: string
*         example:
*          Qualification: B-Tech

*       - name: Verification_status
*         in: formData
*         required: true
*         type: string
*         example:
*          Verification_status: verified

*       - name: Login_id
*         in: formData
*         required: true
*         type: string
*         example:
*          Login_id: student

*       - name: Password
*         in: formData
*         required: true
*         type: string
*         example:
*          Password: Beena1345^babu

*       - name: profilephoto
*         in: formData
*         required: true
*         type: string
*         example:
*          profilephoto: Teacher.jpg
*
*       - name: Id_proof_front
*         in: formData
*         required: true
*         type: string
*         example:
*          Id_proof_front: fhy.png

*       - name: Id_proof_back
*         in: formData
*         required: true
*         type: string
*         example:
*          Id_proof_back: fv.png
*     responses:
*         200:
*           description:Success
*/





router.route('/api/delete-student/:id').delete(controller.delete_student)
/** 
* @swagger
*
* /api/delete-student/:id:
*   delete:
*     description:
*       - deleting the student
*     summary: Use to delete student
*     tags:
*       - students Module
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





router.route('/api/edit-student/:id').put(controller.update_student)
/** 
* @swagger
*
* /api/edit-student/:id:
*   put:
*     description:
*       - updating the detils of student
*     summary: Use to update details of student
*     tags:
*       - students Module
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
* 
*       - name: AddressLine1
*         in: formData
*         required: true
*         type: string
*         example:
*          AddressLine1: balabhavanam,vallikunnam,vallikunnam.p.o

*       - name: AddressLine2
*         in: formData
*         required: true
*         type: string
*         example:
*          AddressLine2: balabhavanam,vallikunnam,vallikunnam.p.o

*       - name: CityorCountry
*         in: formData
*         required: true
*         type: string
*         example:
*          CityorCountry: Kayamkulam

*       - name: Zip_Code
*         in: formData
*         required: true
*         type: string
*         example:
*          Zip_code: 690504

*       - name: PhoneNumber
*         in: formData
*         required: true
*         type: string
*         example:
*          PhoneNumber: 9823456712

*       - name: Email
*         in: formData
*         required: true
*         type: string
*         example:
*          Email: adminusers12@gmail.com

*       - name: Email_Verification_status
*         in: formData
*         required: true
*         type: string
*         example:
*          Email_Verification_status: verified/not-verified

*       - name: Qualifiaction
*         in: formData
*         required: true
*         type: string
*         example:
*          Qualification: B-Tech

*       - name: Verification_status
*         in: formData
*         required: true
*         type: string
*         example:
*          Verification_status: verified

*       - name: Login_id
*         in: formData
*         required: true
*         type: string
*         example:
*          Login_id: student

*       - name: Password
*         in: formData
*         required: true
*         type: string
*         example:
*          Password: Beena1345^babu

*       - name: profilephoto
*         in: formData
*         required: true
*         type: string
*         example:
*          profilephoto: Teacher.jpg
*
*       - name: Id_proof_front
*         in: formData
*         required: true
*         type: string
*         example:
*          Id_proof_front: fhy.png

*       - name: Id_proof_back
*         in: formData
*         required: true
*         type: string
*         example:
*          Id_proof_back: fv.png 

*     responses:
*         200:
*           description:Success
*/

router.route('/api/getone-student/:id').get(controller.getOne_student);

/** 
* @swagger
*
* /api/getone-student/:id:
*   get:
*     description:
*       - getone the student
*     summary: Use to getone student
*     tags:
*       - students Module
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

