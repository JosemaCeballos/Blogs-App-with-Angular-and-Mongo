"use strict";

var validator = require("validator");
var fs = require("fs");
var path = require("path");

var Article = require("../models/article");

var controller = {
  datosCurso: (req, res) => {
    var hola = req.body.hola;
    return res.status(200).send({
      curso: "Master en Frameworks JS",
      estudiante: "Jose Maria Ceballos",
      hola,
    });
  },
  //! -------------------------------------------------------------------------

  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la acción test de mi controlador de articulos",
    });
  },

  //! -------------------------------------------------------------------------

  save: (req, res) => {
    // Recogemos parametros por post
    const params = req.body;
    // Validamos datos por medio de la librería validator
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
    if (validate_title && validate_content) {
      // Creamos el objecto a guardar
      var article = new Article();

      // Asignamos valores
      article.title = params.title;
      article.content = params.content;

      if (params.image) {
        article.image = params.image;
      } else {
        article.image = null;
      }

      // Guardar el articulo
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            status: "error",
            message: "El articulo no se ha guardado",
          });
        }

        // Devolver una respuesta
        return res.status(200).send({
          status: "sucess",
          article: articleStored,
        });
      });
    } else {
      return res.status(200).send({
        status: "error",
        message: "Los datos no son validos",
      });
    }
  },

  getArticles: (req, res) => {
    var query = Article.find({});
    var last = req.params.last;
    if (last || last != undefined) {
      query.limit(3);
    }
    //Find
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los articulos",
        });
      } else if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "No hay articulos para mostrar",
        });
      } else {
        return res.status(200).send({
          status: "sucess",
          articles,
        });
      }
    });
  },

  getArticle: (req, res) => {
    var articleId = req.params.id;
    if (!articleId || articleId == null || articleId == undefined) {
      return res.status(404).send({
        status: "sucess",
        message: "No existe el articulo",
      });
    }
    Article.findById(articleId, (err, article) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los datos",
        });
      } else if (!article) {
        return res.status(404).send({
          status: "error",
          message: "No existe el articulo",
        });
      } else {
        return res.status(200).send({
          status: "sucess",
          article,
        });
      }
    });
  },

  update: (req, res) => {
    var articleId = req.params.id;
    var params = req.body;

    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
    if (validate_title && validate_content) {
      Article.findOneAndUpdate(
        { _id: articleId },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error al actualizar",
            });
          } else if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "No existe el articulo",
            });
          } else {
            return res.status(200).send({
              status: "sucess",
              article: articleUpdated,
            });
          }
        }
      );
    } else {
      return res.status(200).send({
        status: "sucess",
        message: "La validación no es correcta",
      });
    }
  },

  delete: (req, res) => {
    var articleId = req.params.id;

    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar",
        });
      } else if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se encontro el articulo",
        });
      } else {
        return res.status(200).send({
          status: "sucess",
          article: articleRemoved,
        });
      }
    });
  },

  upload: (req, res) => {
    var file_name = "Imagen no subida...";
    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }

    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");
    var file_name = file_split[2];
    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];

    if (file_ext != "png" && file_ext != "jpg" && file_ext != "gif") {
      fs.unlink(file_path, (err) => {
        return res.status(200).send({
          status: "error",
          message: "La extensión de la imagen no es válida",
        });
      });
    } else {
      var articleId = req.params.id;

      if (articleId) {
        Article.findOneAndUpdate(
          { _id: articleId },
          { image: file_name },
          { new: true },
          (err, imageUpdated) => {
            if (err || !imageUpdated) {
              return res.status(200).send({
                status: "error",
                message: "Error al guardar la imagen del articulo",
              });
            } else {
              return res.status(200).send({
                status: "sucess",
                article: imageUpdated,
              });
            }
          }
        );
      } else {
        return res.status(200).send({
          status: "error",
          image: file_name,
        });
      }
    }
  },

  getImage: (req, res) => {
    var file = req.params.image;
    var path_file = "./upload/articles/" + file;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({
          status: "error",
          message: "La imagen no existe",
        });
      }
    });
  },

  search: (req, res) => {
    var searchString = req.params.search;

    Article.find({
      $or: [
        {
          title: { $regex: searchString, $options: "i" },
        },
        {
          content: { $regex: searchString, $options: "i" },
        },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error en la petición",
          });
        } else if (!articles || articles.length <= 0) {
          return res.status(500).send({
            status: "sucess",
            message: "No hay articulos que coincidan con tu busqueda",
          });
        }
        return res.status(200).send({
          status: "sucess",
          articles,
        });
      });
  },
};

module.exports = controller;
