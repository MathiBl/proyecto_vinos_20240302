// Un controlador va a tener todas las funciones que vamos a necesitar para devolver datos al usuario.

const Favorites = require("../models/favorites.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
const Wine = require("../models/wine.model");

const addWine = async (req, res, next) => {
  try {
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

    // RESPONDO AL USUARIO
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
  //3. Devolver al usuario el parámetro Wines
  // Hacerlo con try catch
};

modules.export = { addWine };
