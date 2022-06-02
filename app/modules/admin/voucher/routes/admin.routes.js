module.exports = app => {

    const adminApi = require("../controllers/admin.controller");
    const authService = require('../../../../services/auth.handler.js');



    app.post("/api/admin/voucher-code/generation", adminApi.voucher_code_generation);
    /**
     * @swagger
     *
     * /api/admin/voucher-code/generation:
     *   post:
     *     description:
     *       - Use to generate voucher code
     * 
     *     summary: Use to generate voucher code
     * 
     *     tags:
     *        - Voucher Module
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
     *         description: eg- MzYxODU3NzUxNg==  (use admin auth token)
     * 
     *       - name: voucher_key_no
     *         in: formData
     *         required: true
     *         type: integer
     *         description: eg- The no of vouhers to be generated
     *         example:
     *          voucher_key_no:1
     * 
     *       - name: voucher_key_length
     *         in: formData
     *         required: true
     *         type: integer
     *         description: eg- The length of voucher key
     *         example:
     *          voucher_key_length: 6
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
     *          amount: 500
     * 
     *       - name: expiry_days
     *         in: formData
     *         required: true
     *         type: integer
     *         example:
     *          expiry_days: 15
     * 
     * 
     *     produces:
     *       - application/json
     *     responses:
     *         200:
     *           description:Success
     */

    app.put("/api/admin/voucher-code/edit/{id}", adminApi.voucher_code_updation);

    /**
     * @swagger
     *
     * /api/admin/voucher-code/edit/{id}:
     *   put:
     *     description:
     *       - Use to  update generate voucher code
     * 
     *     summary: Use to update generate voucher code
     * 
     *     tags:
     *        - Voucher Module
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
     *         description: eg- MzYxODU3NzUxNg==  (use admin auth token)
     * 
     *       - in: path
     *         name: id   # Note the name is the same as in the path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: eg- 1
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
     *          amount: 500
     * 
     *       - name: status
     *         in: formData
     *         required: true
     *         type: integer
     *         example:
     *          status: 1
     * 
     * 
     *     produces:
     *       - application/json
     *     responses:
     *         200:
     *           description:Success
     */


};


