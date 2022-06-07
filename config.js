const dotenv = require('dotenv');

dotenv.config();

const config = {
    // Default Images/Avatar
    img: {
        teacher: 'https://santhoshcampus.com/assets/images/teacher_140_180.png',
    },
    database: {


        // Production DB details in aws lms account
        // host: 'lmsproduction.ctdhberlupls.ap-south-1.rds.amazonaws.com', // database host
        // user: 'lmsproduction', // your database username
        // password: 'lmsproduction', // your database password
        // port: 3306, // default MySQL port
        // db: 'lmsdb', // your database name


        // Dev DB
        host: 'eoc-dev.ch1bcu7lsudm.ap-south-1.rds.amazonaws.com', // database host
        user: 'ecodev', // your database username
        password: 'eocnodedev', // your database password
        port: 3306, // default MySQL port
        db: 'eoc', // your database name

    },
    MEDIA_FOLDER: 'uploads',
    integrations: {
        agora: {
            appId: process.env.AGORA_APP_ID,
            appCerts: process.env.AGORA_APP_CERTS,
        },
    },

    S3Bucket: {
        BUCKET_NAME: 'santhoshcampus',
        IAM_USER_KEY: 'AKIAWSBSPUESFWVM4C65',
        IAM_USER_SECRET: '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'
    }
};


module.exports = config;
