const express = require('express')
const controller = require('../controller/Batch.controller')
const router = express('Router');




router.route('/api/batchlist').get(controller.get_batch);


/** 
* @swagger
*
* /api/batchlist:
*   get:
*     description:
*       - getting the batch
*     summary: Use to get batch
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
*     responses:
*         200:
*           description:Success
*/


router.route('/api/add-batch').post(controller.create_batch);
/** 
* @swagger
*
* /api/add-batch:
*   post:
*     description:
*       - adding the batch
*     summary: Use to add batch
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





router.route('/api/delete-batch/:id').delete(controller.delete_Batch)
/** 
* @swagger
*
* /api/delete-batch/:id:
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





router.route('/api/edit-batch/:id').put(controller.update_Batch)
/** 
* @swagger
*
* /api/edit-batch/:id:
*   put:
*     description:
*       - updating the detils of batch
*     summary: Use to update details of batch
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

*       - name: id
*         in: formData
*         required: true
*         type: string
*         example:
*          id: 65
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

* 
*      
*        
*     responses:
*         200:
*           description:Success
*/

router.route('/api/getone-batch/:id').get(controller.getOne_batch);

/** 
* @swagger
*
* /api/getone-batch/:id:
*   get:
*     description:
*       - getone the batch
*     summary: Use to getone batch
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

