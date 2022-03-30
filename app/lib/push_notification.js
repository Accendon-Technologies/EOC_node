
const firebase = require("firebase-admin");

const serviceAccount = require('../config/epssa-test-firebase-adminsdk-e7x1t-8bdf1608dc.json');

// The Firebase token of the device which will get the notification
// It can be a string or an array of strings
const firebaseToken = 'abcdeabcdeabcde';

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});

const payload = {
    notification: {
        title: 'Notification Title',
        body: 'This is an example notification. request closed.',
    }
};

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
};

// const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYyNzk5NjI4OCwiZXhwIjoxNjI3OTk5ODg4LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay13M2ljNUBlcHNzYS10ZXN0LXZlcnNpb24uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay13M2ljNUBlcHNzYS10ZXN0LXZlcnNpb24uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiI5OTk1MTE2MzgxIn0.GQAg6jTy7yvHuey-Vkyji2WbauMyZ6Hoyx9WSsBNK7nQwUzVz14lUNNSVEsxsGNeXY5m0PSYo_107glKp91KrLlKBvm4ozNSDXWerm9RM8mrOIlwyj6nfMjctA36fNrLpV3xCgBcRM6skuJOyW8ijwSYd5qQQoEEImU4HEFQBbGRsOkdEGmg92-OtjwfhzYfE9cCUOn9bvLNADZnXVEy2flSgW5pSifgFvjtbdlxmlJKmrJlk_gK1dYw1IVEnosvOG-GUpaOECSWfQScKQgyPMPjZ2S39wCsKRgDeAC1mPhWW-TAv3ILUB-qFXYyRCaVMahUr0QszEtioK4YJKRnBQ"
module.exports.tokenGeneration = async (info) => {
    try {

        // const sendNote = await firebase.messaging().sendToDevice(firebaseToken, payload, options);
        console.log("----- In notify ------ :")

        const uid = '9995116381';
        await firebase.auth()
            .createCustomToken(uid)
            .then((customToken) => {
                // Send token back to client

                console.log("--------customToken--------- :", customToken)
            })
            .catch((error) => {
                console.log('Error creating custom token:', error);
            });

    } catch (error) {
        console.log("----- error ----- :", error)
        return error
    }
}

module.exports.notification = async (info) => {
    try {

        await firebase.messaging().sendToDevice(`${info.token}`, info.payload, options)
            .then(function (response) {

                return response
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
                return error;
            });
        // return sendNote
    } catch (error) {
        console.log("----- error ----- :", error)
        return error
    }
}