"use strict";
const curl = require("curl");
const keyId = "";
const secretkey = ""
var msg = ""

//Email module
const servicePaymentEmail = require('../utilities/service_payment')
const devicePaymentEmail = require('../utilities/device_payment')
const Service = require("../modules/services/models/services.model");
const LicensePackage = require("../modules/admin/license_package/models/license_pack.model");

var moment = require('moment')

// console.log("-----process.env.NODE_APP_STAGE ---- :", process.env.NODE_APP_STAGE)
var Razorpay = require("razorpay");
var instance;
var key_id;
var key_secret;

if (process.env.NODE_APP_STAGE === 'production') {
    instance = new Razorpay({
        key_id: 'rzp_live_qHCt6N24zh54Im',
        key_secret: 'd6DSR4eY0FYJuLeaEp7HGesl',
    });

    key_id = 'rzp_live_qHCt6N24zh54Im';
    key_secret = 'd6DSR4eY0FYJuLeaEp7HGesl';


} else {
    instance = new Razorpay({
        key_id: 'rzp_test_EF1mXFZKgWL0Ax',
        key_secret: '52gRTB5xoWOGNAaPvuyHgSTG',
    });

    key_id = 'rzp_test_EF1mXFZKgWL0Ax';
    key_secret = '52gRTB5xoWOGNAaPvuyHgSTG';
}



const { savePaymentDetails, saveDevicePayment, getOneDetails, savePaymentHistory } = require('../modules/services/models/services.model')

const ServiceRequest = require('../modules/admin/service_request/models/service_request.model')
const Device = require("../modules/admin/device/models/device.model");
const User = require('../modules/users/models/user.model')
const Notification = require('../modules/notifications/models/notifications.model')

// exports.capturePayment = async (req, res) => {
//     try {
//         console.log("----- req ----- :", req.body)
//         console.log("----- date ----- :", moment(1605871409, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm'))
//         // const result = await instance.payments.all({
//         //     from: 'Aug 25, 2018',
//         //     to: 'Aug 30, 2020'
//         // })

//         // to create customer 
//         // const result = await instance.customers.create({
//         //     "name": "EPSSA-TEST",
//         //     "email": "Epssa2020@gmail.com",
//         //     "contact": 9995116381,
//         //     "notes": {
//         //         "notes_key_1": "For EPSSA- test account",
//         //         "notes_key_2": "For EPSSA- test account"
//         //     }
//         // })

//         //To get orders
//         // const result = await instance.orders.all({
//         //     from: 'Aug 25, 2018',
//         //     to: 'Aug 30, 2021',
//         //     count: 1,
//         //     skip: 1,
//         //     authorized: 1,
//         //     "receipt": "Receipt no. 1"
//         // })



//         // // create an order
//         // const info = {
//         //     "amount": 100,
//         //     "currency": "INR",
//         //     "receipt": "Receipt no. 1",
//         //     "payment_capture": 1,
//         //     "notes": {
//         //         "notes_key_1": "Tea, Earl Grey, Hot",
//         //         "notes_key_2": "Tea, Earl Grey… decaf."
//         //     }
//         // }

//         // const result = await instance.orders.create(info)
//         res.status(200).send({ "success_status": true, "message": result });



//         // res.status(500).send({ "success_status": false, "message": "Payment Cancelled. Please try again.." })
//     } catch (err) {
//         console.log("------ err ------ :", err)
//         res.status(500).send({ "success_status": false, message: err })

//     }
// }

exports.capturePayment = async (req, res) => {
    try {
        console.log("----- USER ID  ----- :", req.user.id)

        console.log("----- req ----- :", req.body[0])
        const obj = req.body[0]

        console.log("----- payment_status ----- :", obj.type)

        let data = {}
        let query_builder = {}
        let result = {}

        if (obj.payment_status === "success") {
            if (obj.payment_mode === 'online') {
                result = await instance.payments.capture(`${obj.payment_id}`, parseInt(obj.amount), "paise")

            } else {
                result = {
                    id: obj.payment_id,
                    amount: obj.amount,
                    status: 'captured',
                    error_reason: null,
                    error_description: null
                }
            }
            // console.log("======result=========== :", result)
            if (obj.type === 'service') {
                // console.log("--- in if service loopp --------")
                for (let i = 0; i < obj.type_id.length; i++) {
                    query_builder = {
                        model: obj.type === 'service' ? 'service_request' : 'user_equipments',
                        where: { id: parseInt(obj.type_id[i]) }
                    }
                    const getDetails = await getOneDetails(query_builder)

                    data = {
                        customer_id: getDetails.customer_id,
                        vendor_id: getDetails.vendor_id,
                        service_id: obj.type_id[i],
                        amount: obj.payment_mode === 'online' ? (result.amount) / 100 : result.amount,
                        paid_on: moment().format(),
                        payment_mode: obj.payment_mode,
                        payment_status: 1
                    }
                    query_builder = {
                        data: data,
                    }
                    await savePaymentDetails(query_builder)



                    data = {
                        user_id: req.user.id,
                        payment_id: result.id,
                        amount: obj.payment_mode === 'online' ? (result.amount) / 100 : result.amount,
                        type: obj.type,
                        type_id: obj.type_id[i],
                        error_reason: result.error_reason,
                        error_description: result.error_description,
                        payment_mode: obj.payment_mode,
                        paid_on: moment().format(),
                        payment_status: result.status,
                        status: true
                    }
                    query_builder = {
                        data: data,
                    }
                    await savePaymentHistory(query_builder)

                    // status updation
                    if (obj.payment_mode === 'online') {
                        query_builder = {
                            data: { status: 12 },
                            where: { id: obj.type_id[i] }
                        }



                        const notfication_query_builder = {
                            data: {
                                context_id: obj.type_id[i],
                                receiver_id: req.user.id,
                                context_type: 'SRV_REQ_CLOSE',
                                status: 0,
                                title: "Request closed",
                                message: `Booking no : ${obj.type_id[i]} is closed.`,
                                created_at: moment().format(),
                                scheduled_for: moment().format()
                            }
                        }

                        await Notification.create(notfication_query_builder)

                    }
                    else {
                        query_builder = {
                            data: { status: 11 },
                            where: { id: obj.type_id[i] }
                        }
                        await ServiceRequest.update(query_builder)
                        res.status(200).send({ "success_status": true, "message": "Payment details successfully saved." });

                    }
                    await ServiceRequest.update(query_builder)

                    //send Emails 
                    // to send Email to customer
                    query_builder = {
                        columns: '*',
                        where: { 'sr.id': obj.type_id[i] },
                    }
                    const getEmailDetails = await Service.email_details(query_builder)

                    let info = {
                        subject: "Payment Completed",
                        booking_id: getEmailDetails.response.booking_id,
                        ...getEmailDetails.response.service_details,
                        ...getEmailDetails.response.worker_details[0],
                        ...getEmailDetails.response.finalBill[0],

                        payment_id: result.id,
                        payment_amount: obj.payment_mode === 'online' ? (result.amount) / 100 : result.amount,
                    }
                    // console.log("-------------info ---- :", info)
                    await servicePaymentEmail.sendEmails(info)

                    query_builder = {
                        data: {
                            context_id: getEmailDetails.response.booking_id,
                            receiver_id: req.user.id,
                            context_type: 'SRV_REQ_PAYMENT',
                            status: 0,
                            title: "Payment completed",
                            message: `Booking no : ${getEmailDetails.response.booking_id} payment completed.`,
                            created_at: moment().format(),
                            scheduled_for: moment().format()
                        }
                    }

                    await Notification.create(query_builder)

                }
            } else {
                console.log("-- in else ----")
                let equipmet_details = []
                let getdeviceEmail = {}

                for (let i = 0; i < obj.type_id.length; i++) {
                    query_builder = {
                        model: 'user_equipments',
                        where: { id: parseInt(obj.type_id[i]) }
                    }
                    const getDetails = await getOneDetails(query_builder)
                    console.log("-------getDetails ***--------- :", getDetails)
                    data = {
                        customer_id: getDetails.user_id,
                        vendor_id: 0,
                        service_id: obj.type_id[i],
                        amount: (result.amount) / 100,
                        paid_on: moment().format(),
                        payment_mode: obj.payment_mode,
                        payment_status: 1
                    }
                    query_builder = {
                        data: data,
                    }
                    await saveDevicePayment(query_builder)


                    // to update user equipmet table
                    query_builder = {
                        data: { status: 1 },
                        where: { id: obj.type_id[i] }
                    }
                    await Device.update(query_builder)

                    data = {
                        user_id: req.user.id,
                        payment_id: result.id,
                        amount: (result.amount) / 100,
                        type: obj.type,
                        type_id: obj.type_id[i],
                        error_reason: result.error_reason,
                        error_description: result.error_description,
                        payment_mode: obj.payment_mode,
                        paid_on: moment().format(),
                        payment_status: result.status,
                        status: true
                    }
                    query_builder = {
                        data: data,
                    }
                    await savePaymentHistory(query_builder)

                    // to mail info get service info    
                    query_builder = {
                        columns: '*',
                        where: { 'ue.id': obj.type_id[i] },
                    }
                    getdeviceEmail = await Service.email_details_for_device(query_builder)
                    equipmet_details.push({
                        equipment_name: getdeviceEmail.response[0].device_name,
                        brand_name: getdeviceEmail.response[0].brand_name
                    })

                    // new notification msg creation
                    query_builder = {
                        data: {
                            context_id: obj.type_id[i],
                            receiver_id: req.user.id,
                            context_type: 'DVC_PURCHASED',
                            status: 0,
                            title: "Device Purchased",
                            message: `Device ${getdeviceEmail.response[0].device_name} is purchased.`,
                            created_at: moment().format(),
                            scheduled_for: moment().format()
                        }
                    }

                    await Notification.create(query_builder)

                }




                //License package updation
                let get_amount = {}
                let license_package_id = 0
                query_builder = {
                    columns: ['id', 'user_id', 'status'],
                    where: { 'UE.user_id': req.user.id, 'UE.status': 1 }
                }
                const deviceDetails = await Device.getOne(query_builder)
                let device_Count = deviceDetails.response.length
                if (device_Count >= 1 && device_Count <= 5) {
                    query_builder = {
                        columns: ['id', 'license_name', 'amount', 'max_device_count', 'min_device_count'],
                        where: { license_name: 'Upto 5 device' }
                    }

                } else if (device_Count >= 6 && device_Count <= 10) {
                    query_builder = {
                        columns: ['id', 'license_name', 'amount', 'max_device_count', 'min_device_count'],
                        where: { license_name: '5 to 10 devices' }
                    }

                } else if (device_Count >= 11 && device_Count <= 100) {

                    query_builder = {
                        columns: ['id', 'license_name', 'amount', 'max_device_count', 'min_device_count'],
                        where: { license_name: 'Above 10 Device' }
                    }
                }

                get_amount = await LicensePackage.getOne(query_builder)
                license_package_id = get_amount.response[0].id
                console.log("---------license_package_id ------:", license_package_id)

                //update User
                query_builder = {
                    data: { license_status: 1, is_licensed: true, license_package_id: license_package_id },
                    where: { id: parseInt(req.user.id) },
                }
                await User.updateByAdmin(query_builder)

                let info_1 = {
                    subject: "Payment Completed",
                    equipmet_details: equipmet_details,
                    payment_id: result.id,
                    payment_amount: (result.amount) / 100,
                    license_name: get_amount.response[0].license_name,
                    min_device_count: get_amount.response[0].min_device_count,
                    max_device_count: get_amount.response[0].max_device_count,
                    user_name: getdeviceEmail.response[0].user_name,
                    user_email: getdeviceEmail.response[0].user_email

                }
                // console.log("-------------info_1 ---- :", info_1)
                await devicePaymentEmail.sendEmails(info_1)

            }


            res.status(200).send({ "success_status": true, "message": "Payment details successfully saved." });

        } else {
            res.status(203).send({ "success_status": true, "message": "Transaction failed." });
        }

    } catch (err) {
        console.log("------ err ------ :", err)
        res.status(400).send({ "success_status": false, "message": err })

    }
}