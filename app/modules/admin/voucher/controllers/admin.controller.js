const adminService = require("../services/admin.service");
const authService = require('../../../../services/auth.handler.js');


// voucher code generation
exports.voucher_code_generation = async (req, res) => {
    try {

        const result = await adminService.voucher_code_generation(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};

// voucher code updation
exports.voucher_code_updation = async (req, res) => {
    try {

        const result = await adminService.voucher_code_updation(req)
        res.status(result.status_code).send(result);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            success_status: false, message: error
        });
    }
};