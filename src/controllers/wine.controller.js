// Un controlador va a tener todas las funciones que vamos a necesitar para devolver datos al usuario.

const Wine = require("../models/wine.model");
// const Contributor = require("../model/contributor.model"); // Eso de momento lo comento, a ver si nos sirve
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// FUNCIONES CRUD (acrónimo de "Consultar, Crear, Actualizar y Borrar", que son las 4 cosas que se pueden hacer con una base de datos)

// CONSULTAR...
// ...UN VINO
const getWine = async (req, res, next) => {
  try {
    // 1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    // 2. BUSCO EN LA BBDD POR ID
    const wine = await Wine.findById(id); //.populate("contributors");
    // 3. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: wine,
    });
  } catch (error) {
    next(error); // El next tiene la función de enviar el error y su tipo a su padre
  }
};

// ...TODOS LOS VINOS
const getWines = async (req, res, next) => {
  // Cambiamos de getWine a getWines
  try {
    // 1. BUSCO TODAS LAS TRACKS
    const wines = await Wine.find(); //.populate("contributors");
    // 2. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: wines,
    });
  } catch (error) {
    next(error);
  }
};

// CREAR
const createWine = async (req, res, next) => {
  try {
    //1. CREAR UNA VARIABLE (TIPO WINE) QUE RECOJA LOS DATOS QUE ENVIA EL USUARIO
    const wine = new Wine(req.body);
    // 2. GUARDAR EN BBDD
    await wine.save();
    // 3. CONTESTAR AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: wine,
    });
  } catch (error) {
    next(error);
  }
};

// ACTUALIZAR
const updateWine = async (req, res, next) => {
  try {
    // 1. BUSCAR EL WINE QUE HAY QUE MODIFICAR
    const id = req.params.id;
    // 2. RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
    const body = req.body;
    // 3. ACTUALIZAR LA FUNCIÓN
    const wine = await Wine.findByIdAndUpdate(id, body, { new: true });
    // 4. CONTESTAR AL USUARIO
    if (!wine) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: wine,
    });
  } catch (error) {
    next(error);
  }
};

// BORRAR
const deleteWine = async (req, res, next) => {
  try {
    // 1. BUSCAR EL WINE QUE HAY QUE BORRAR
    const id = req.params.id;
    // 2. ACTUALIZAR LA FUNCIÓN
    const wine = await Wine.findByIdAndDelete(id);
    // 4. CONTESTAR AL USUARIO
    if (!wine) {
      return res.status(404).json({
        message: "Vino no encontrado", //Hemos piesto un mensaje de error personalizado. Sería lo mismo que poner "message: HTTPSTATUSCODE[404]"
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: wine,
    });
  } catch (error) {
    next(error);
  }
};

// Por último, exportamos las diferentes funciones creadas.
module.exports = { getWine, getWines, createWine, updateWine, deleteWine };
