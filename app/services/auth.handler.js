const jwt = require('jsonwebtoken');
const accessTokenSecret = 'SecretEPSSA!';
// const UserAuth = require("../modules/users/models/user_auth.model.js");

exports.authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).send({
                    success_status: false,
                    message:
                        err.message || "Invalid token"
                });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send({
            success_status: false,
            message: "Invalid JWT"
        });
    }
};

exports.authorizeUser = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).send({
                    success_status: false,
                    message:
                        err.message || "Invalid token"
                });
            }
            // console.log("-------user------- :", user)
            if (req.body.id == user.id) {
                // console.log("-------inside------- :")

                req.user = user;
                next();
            } else {
                return res.status(403).send({
                    success_status: false,
                    message: "Unauthorized User"
                });
            }

        });
    } else {
        res.status(401).send({
            success_status: false,
            message: "Invalid Token"
        });
    }
};

exports.userDetails = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(205).send({
                    success_status: true,
                    message:
                        err.message || "Invalid token"
                });
            }
            if (user.id) {
                req.user = user;
                // console.log("----- Auth token user ==== :", user)
                next();
            } else {
                return res.status(403).send({
                    success_status: false,
                    message: "Unauthorized User"
                });
            }

        });
    } else {
        res.status(401).send({
            success_status: false,
            message: "Invalid Token"
        });
    }
};

exports.authorizeDevice = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const isDeviceLoggedIn = () => {
            return new Promise(resolve => {
                jwt.verify(token, accessTokenSecret, (err, user) => {
                    const deviceId = user.device_id;
                    const query_builder = {
                        columns: ['status'],
                        where: { device_id: deviceId, user_id: req.body.id, status: 1 }
                    }
                    UserAuth.getOne(query_builder, (err, result) => {
                        resolve(result)

                    })

                })

            })
        }

        (async (req, res, next) => {
            const auth_result = await isDeviceLoggedIn();
            const parsed_result = JSON.parse(JSON.stringify(auth_result))

            if (parsed_result != null && Object.values(parsed_result).length) {
                next();
            } else {
                return res.status(403).send({
                    success_status: false,
                    message: "Unauthorized device,Please login first."
                });
            }
        })(req, res, next)
    } else {
        res.status(401).send({
            success_status: false,
            message: "Invalid token"
        });
    }
};