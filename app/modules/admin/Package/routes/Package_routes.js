const express = require('express');
const controller = require('../controller/Package_controller');
const router = express('Router');


//.......get PAckage............//

router.route('/api/get_package').get(controller.getpackage);

/**
 * @swagger
 * 
 * /api/get_package:
 *  get:
 *      description:
 *          -   get the package
 *      summary: use to get the package
 *      tags:
 *          -   Package Module
 *      produces:
 *          -   application/json
 *      parameters:
 *          -   in: header
 *              name: content-Type
 *              type: string
 *              value: application/x-www-form-urlencoded
 *              requires: true
 *      responses:
 *              200:
 *                  description: success
 *              
 * 
 */



//....................Post Package....................//

router.route('/api/create_Package').post(controller.create_package);

/**
 * @swagger
 * 
 * /api/create_package:
 *  post:
 *      description:
 *          -   creating a new the package
 *      summary: use to add package
 *      tags:
 *          -   Package Module
 *      produces:
 *          -   application/json
 *      parameters:
 *          -   in: header
 *              name: Content-Type
 *              type: string
 *              value: application/x-www-form-urlencoded
 *              required: true
 * 
 *          -   name: Exam
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: Banking
 * 
 *          -   name: Package_Title
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: BANKING & INSURANCE- LIFETIME
 * 
 *          -   name: Short_Title
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: BANKING LIFETIME
 * 
 *          -   name: Description
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: VIDEO TUTORIALS
 * 
 *          -   name: Language
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: Malayalam
 *          
 *          -   name: Color_Code
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: CCC#
 * 
 *          -   name: Image
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: we.jpg
 * 
 *          -   name: Package_Fee
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: 25000
 * 
 *          -   name: Old_Package_Fee
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: 35000
 * 
 *          -   name: Package_Duration_in_month
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: 6
 * 
 *          -   name: Package_Features
 *              in: formData
 *              requires: true
 *              type: string
 *              example:
 *                  name: video tutorial
 * 
 *      responses:
 *          200:
 *              description: success           
 */


//......................getone package by using id.................//


router.route('/api/getone_package/:id').get(controller.getonePackage);

/**
 * @swagger
 * 
 * /api/getone_package/{id}:
 *  get:
 *      description:
 *          -   get package by id
 *      summary: use to get a package by id
 *      tags:
 *          -   Package Module
 *      produces:
 *          -   application/json
 *      parameters:
 *          -   in: header
 *              name: Content-Type
 *              type: string
 *              value: application/x-www-form-urlencoded
 *              required: true
 * 
 *          -   in: path
 *              name: id
 *              requires: true
 *              type: integer
 *              example:
 *                  id_package: 23
 *      
 *      responses:
 *          200:
 *              description: successs
 *  
 * 
 */

module.exports = router;