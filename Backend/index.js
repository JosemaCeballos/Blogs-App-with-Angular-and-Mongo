"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/api_rest_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "La conexión a la base de datos se ha realizado de manera correcta"
    );

    // Crear servidor y escuchar las peticiones HTTP
    app.listen(port, () => {
      console.log("Servidor corriendo en el puerto " + port);
    });
  });
