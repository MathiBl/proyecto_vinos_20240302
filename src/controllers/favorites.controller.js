// Un controlador va a tener todas las funciones que vamos a necesitar para devolver datos al usuario.

const Favorites = require("../models/favorites.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
const Wine = require("../models/wine.model");

const addWine = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const wine = new Wine(req.body);
    console.log(wine);
    // let favorite = Favorites.findOneAndUpdate(
    //   { userId: userId },
    //   { $push: { wines: wine } }
    // );
    let favorite = Favorites.findOne({ userId: userId });
    if (!favorite) {
      console.log("Creando un favorite nuevo");
      favorite = new Favorites({ userId: userId });
      console.log(favorite);
      favorite.wines.push(wine);
      favorite.save();
    } else {
      console.log("Ya existe");
      console.log(favorite);
    }

    // // RESPONDO AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: "hola",
    });
  } catch (error) {
    next(error); // El next tiene la función de enviar el error y su tipo a su padre
  }
};

const getWinesByUser = async (req, res, next) => {
  try {
    //1. Obtener el userId
    const id = req.params.userId;
    //2. Buscar el favorito que tiene ese userId
    const favorites = await Favorites.findById(userId); //.populate("contributors");
    //3. Devolver al usuario el parámetro Wines
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: favorites,
    });
  } catch (error) {
    next(error); // El next tiene la función de enviar el error y su tipo a su padre
  }
};

module.exports = { addWine };
