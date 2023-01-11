"use strict";

// Cargar módulos de node para crear servidor
var express = require("express");
var bodyParser = require("body-parser");

// Ejecutar expres (http)
var app = express();

// Cargar ficheros rutas
var article_routes = require("./routes/article");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Añadir prefijo y cargar rutas
app.use("/api", article_routes);

// Ruta o metodo de prueba para la api

// Exportar módulo (fichero actual) para cargar app.js y lanzar el servidor para que sea escuchado
module.exports = app;
