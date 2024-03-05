// Las rutas son los endpoints que va a tener la api. Cada vez que un usuario nos pida datos, tenemos que saber que datos quiere. Según la petición que nos haga el usuario, tenemos que definir la ruta y luego llamar a la función adecuada (que están en el controller) para satisfacer a esa petición.

const express = require("express");

// El router es el objeto que nos va a manejar todas las rutas.
const wineryRouter = express.Router();

// Instanciamos al controlador para usar las funciones relativas a cada ruta.
const {
  getWinery,
  getWineries,
  createWinery,
  updateWinery,
  deleteWinery,
} = require("../controllers/winery.controller");

const { isAuth } = require("../middlewares/auth.middleware"); // Llamamos a la función de autentificación que servirá de policía (definir quién entra y quién no).

// const { isAuth } = require("../middlewares/auth.middleware"); // Llamamos a la función de autentificación que servirá de policía (definir quién entra y quién no).

// LAS RUTAS
//nombreDelRouter.tipoDePetición('endpoint', <nombreDeLaFunciónQueVaAResolverEseEndpoint>);

// Metemos al policía [isAuth] en las funciones que puedan alterar a nuestra base de datos, aunque sería más seguro ponerlo en todas. Gracias a esto, nos aseguramos que la persona que entra sea alguién que hemos autorizado.

// OBTENER UNA BODEGA
wineryRouter.get("/:id", getWinery);

// OBTENER TODAS LAS BODEGAS
wineryRouter.get("/", getWineries);

// CREAR UNA BODEGA
wineryRouter.post("/", /*[isAuth],*/ createWinery);

// ACTUALIZAR UNA BODEGA
// Tipo de petición: PATCH o PUT.
// PUT:  consiste en actualizar/reemplazar un recurso en su totalidad.
// PATCH: consiste en actualizar un recurso de forma parcial.
// Para entender la diferencia entre los dos: https://www.geeksforgeeks.org/difference-between-put-and-patch-request/. Parece que PATCH da menos errores.

wineryRouter.patch("/:id", /*[isAuth],*/ updateWinery); // Si no le ponemos el ID al Endpoint, cambiaría todas las bodegas.

// BORRAR UNA BODEGA
wineryRouter.delete("/:id", /*[isAuth],*/ deleteWinery);

module.exports = wineryRouter; // Eso es para poner el wineryRouter a la disposición del resto de la app.

// Para que nuestra app sepa que ese archivo de rutas existe, tenemos que enlezarlo en el index.
