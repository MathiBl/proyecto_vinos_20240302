// Las rutas son los endpoints que va a tener la api. Cada vez que un usuario nos pida datos, tenemos que saber que datos quiere. Según la petición que nos haga el usuario, tenemos que definir la ruta y luego llamar a la función adecuada (que están en el controller) para satisfacer a esa petición.

const express = require("express");

// El router es el objeto que nos va a manejar todas las rutas.
const wineRouter = express.Router();

// Instanciamos al controlador para usar las funciones relativas a cada ruta.
const {
  getWine,
  getWines,
  createWine,
  updateWine,
  deleteWine,
} = require("../controllers/wine.controller");

const { isAuth } = require("../middlewares/auth.middleware"); // Llamamos a la función de autentificación que servirá de policía (definir quién entra y quién no).

// LAS RUTAS
//nombreDelRouter.tipoDePetición('endpoint', <nombreDeLaFunciónQueVaAResolverEseEndpoint>);

// OBTENER UN VINO
wineRouter.get("/:id", getWine);

// OBTENER TODOS LOS VINOS
wineRouter.get("/", getWines);

// CREAR UN VINO
wineRouter.post("/", [isAuth], createWine);

// ACTUALIZAR UN VINO
// Tipo de petición: PATCH o PUT.
// PUT:  consiste en actualizar/reemplazar un recurso en su totalidad.
// PATCH: consiste en actualizar un recurso de forma parcial.
// Para entender la diferencia entre los dos: https://www.geeksforgeeks.org/difference-between-put-and-patch-request/. Parece que PATCH da menos errores.

wineRouter.patch("/:id", [isAuth], updateWine); // Si no le ponemos el ID al Endpoint, cambiaría todas los vinos.

// BORRAR UN VINO
wineRouter.delete("/:id", [isAuth], deleteWine);

module.exports = wineRouter;
