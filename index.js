const express = require("express");
const bodyParser = require("body-parser");
// const jwt = require('jsonwebtoken');
const app = express();
const path = require('path');
var cors = require('cors');




// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // var allowedOrigins = ['http://example1.com'];
  var allowedOrigins = [''];

  var modifiedOrigin = allowedOrigins.map((url) =>
    url.substring(0, url.length - 1)
  );
  // console.log(modifiedOrigin);
  var origin = req.headers.origin;

  if (modifiedOrigin.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization, Content-Type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "EPSSA API's",
      version: '1.0.0',
      servers: ["http://localhost:3000"]
    }

  },


  apis: [
    "./app/modules/users/routes/user.routes.js",
    "./app/modules/admin/voucher/routes/admin.routes.js",
    "./app/modules/admin/admin_users/router/admin_users.routes.js",
    "./app/modules/admin/Batch/router/Batch.routes.js"


  ]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// parse requests of content-type - application/x-www-form-urlencoded


// var dir = path.join(__dirname, 'uploads');
// app.use(express.static(dir));
app.use('/uploads', express.static(path.join(__dirname, '/uploads/users')))
app.use('/uploads', express.static(path.join(__dirname, '/uploads/pdfs')))


// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to EPSSA Application" });
  res.json({ status: "success", message: "Welcome to EPSSA Application" });

});



require("./app/modules/users/routes/user.routes.js")(app); //  user module
require("./app/modules/admin/voucher/routes/admin.routes.js")(app); //  admin module

app.use('/',require('./app/modules/admin/admin_users/router/admin_users.routes.js'));//adminuser
app.use('/',require('./app/modules/admin/students/router/students.routes.js'));
app.use('/',require('./app/modules/admin/Batch/router/Batch.routes.js'));

// set port, listen for requests
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
