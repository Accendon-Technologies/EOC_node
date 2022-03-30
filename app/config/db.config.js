// let dev = {
//   host: "eoc-dev.ch1bcu7lsudm.ap-south-1.rds.amazonaws.com",
//   user: "ecodev",
//   password: "eocnodedev",
//   database: "eoc",
//   acquireTimeout: 1000000,


//   email_creds: {
//     host: "smtpout.secureserver.net",
//     secure: true,
//     secureConnection: false, // TLS requires secureConnection to be false
//     tls: {
//       ciphers: 'SSLv3'
//     },
//     requireTLS: true,
//     port: 465,
//     debug: true,

//     auth: {
//       user: 'info@epssa.in',
//       pass: 'Epssa@123'
//     }
//   },



//   // ----------End of Test code variables------------------

// };
// // let dev = {
// //   host: "localhost",
// //   user: "root",
// //   password: "",
// //   database: "epssa-uat"
// // };
// let prod = {
//   host: "52.66.15.137",
//   user: "epssa_user",
//   password: "letmein",
//   database: "epssa_uat",
//   acquireTimeout: 1000000,
// };
// let staging = {
//   host: "localhost",//13.126.54.187
//   user: "epssa_user",
//   password: "letmein",
//   database: "epssa_uat"
// };

// // console.log("-------process.env.NODE_APP_STAGE------- :", process.env.NODE_APP_STAGE)

// let config = "";
// switch (process.env.NODE_APP_STAGE) {
//   case 'production':
//     config = prod;
//     break;
//   case 'development':
//     config = dev;
//     break;
//   case 'staging':
//     config = staging;
//     break;
//   default:
//     config = dev;

// }

// module.exports = {
//   ...config
// };

const mysql = require("mysql");
const config = require("../../config");


var connection = mysql.createConnection({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 3000,
  acquireTimeout: 60 * 60 * 3000,
  timeout: 60 * 60 * 3000,
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database: config.database.db
})

module.exports.connection = connection;