require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

var whitelist = [
  "http://localhost",
  "http://localhost:3100",
  "https://nombredetuBackend.herokuapp.com/",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

// Port
const port = process.env.PORT || 3100;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes - Enrutador
app.use(require("./router/router"));

// Server
app.listen(port, () => {
  console.log(`Server is running in por ${port}`);
});

// ==============================================================

// // middlewares - Funciones antes de q lleguen a las rutas
// app.use(express.json());                        // json a JS
// app.use(express.urlencoded({extended: false})); // Formulario a Objeto JS // extended false - no se aceptara datos img, etc // solo texto

// Routes - Enrutador
// const api = require("./router/router");
// app.use("/api/v1", api); // http://localhost:3100/api/v1/users

//Server
// app.listen(3000);
// console.log('Server on port', 3000);

// npm i express pg
// install express - pg - dotenv - base62 - uuid

// https://node-postgres.com/features/queries
// https://www.youtube.com/watch?v=7NfvC-gOcRc&t=1255s&ab_channel=FaztCode
// ==============================================================
