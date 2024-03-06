// Un controlador va a tener todas las funciones que vamos a necesitar para devolver datos al usuario.

const Favorites = require("../models/favorites.model");
// const Contributor = require("../model/contributor.model"); // Eso de momento lo comento, a ver si nos sirve
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
const Wine = require("../models/wine.model");

// FUNCIONES CRUD (acrónimo de "Consultar, Crear, Actualizar y Borrar", que son las 4 cosas que se pueden hacer con una base de datos)

// CONSULTAR...
// ...UN VINO
const addWine = async (req, res, next) => {
  try {
    // 1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const userId = req.params.userId;
    const wine = new Wine(req.body);
    const favorite = Favorites.findOne({ userId: userId });

    if (favorite) {
      favorite.wines.push(wine);
      favorite.save();
    } else {
      const newFavorite = new Favorite({ userId: userId, wines: [wine] });
      newFavorite.save();
    }

    // 2. BUSCO EN LA BBDD POR ID
    // 3. RESPONDO AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: wine,
    });
  } catch (error) {
    next(error); // El next tiene la función de enviar el error y su tipo a su padre
  }
};

const getWinesByUser = async (req, res, next) => {
  //1. Obtener el userId
  //2. Buscar el favorito que tiene ese userId
  // 3. Devolver al usuario el parámetro Wines
};

modules.export = { addWine };
