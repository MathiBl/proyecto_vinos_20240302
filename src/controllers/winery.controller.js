// Un controlador va a tener todas las funciones que vamos a necesitar para devolver datos al usuario.

const Winery = require("../model/winery.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// FUNCIONES CRUD (acrónimo de "Consultar, Crear, Actualizar y Borrar", que son las 4 cosas que se pueden hacer con una base de datos)

// CONSULTAR...
// ...UNA BODEGA
const getWinery = async (req, res, next) => {
  try {
    // 1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    // 2. BUSCO EN LA BBDD POR ID
    const winery = await Winery.findById(id);
    // 3. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: winery,
    });
  } catch (error) {
    next(error);
  }
};

// ...TODAS LAS BODEGAS
const getWineries = async (req, res, next) => {
  // Cambiamos de getWinery a getWineries
  try {
    // 1. BUSCO TODAS LAS BODEGAS
    const wineries = await Wineries.find();
    // 2. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: wineries,
    });
  } catch (error) {
    next(error);
  }
};

// CREAR UNA BODEGA
const createWinery = async (req, res, next) => {
  try {
    //1. CREAR UNA VARIABLE (TIPO BODEGA) QUE RECOJA LOS DATOS QUE ENVIA EL USUARIO
    const winery = new Winery(req.body);
    // 2. GUARDAR EN BBDD
    await winery.save();
    // 3. CONTESTAR AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: winery,
    });
  } catch (error) {
    next(error);
  }
};

// ACTUALIZAR UNA BODEGA
const updateWinery = async (req, res, next) => {
  try {
    // 1. BUSCAR LA BODEGA QUE HAY QUE MODIFICAR
    const id = req.params.id;
    // 2. RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
    const body = req.body;
    // 3. ACTUALIZAR LA FUNCIÓN
    const winery = await Winery.findByIdAndUpdate(id, body, { new: true });
    // 4. CONTESTAR AL USUARIO
    if (!winery) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: winery,
    });
  } catch (error) {
    next(error);
  }
};

// BORRAR UNA BODEGA
const deleteWinery = async (req, res, next) => {
  try {
    // 1. BUSCAR LA BODEGA QUE HAY QUE BORRAR
    const id = req.params.id;
    // 2. ACTUALIZAR LA FUNCIÓN
    const winery = await Winery.findByIdAndDelete(id);
    // 4. CONTESTAR AL USUARIO
    if (!winery) {
      return res.status(404).json({
        message: "Bodega no encontrada", //Hemos puesto un mensaje de error personalizado. Sería lo mismo que poner "message: HTTPSTATUSCODE[404]"
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: winery,
    });
  } catch (error) {
    next(error);
  }
};

// Por último, exportamos las diferentes funciones creadas.
module.exports = {
  getWinery,
  getWineries,
  createWinery,
  updateWinery,
  deleteWinery,
};
