// Las rutas son los endpoints que va a tener la api. Cada vez que un usuario nos pida datos, tenemos que saber que datos quiere. Según la petición que nos haga el usuario, tenemos que definir la ruta y luego llamar a la función adecuada (que están en el controller) para satisfacer a esa petición.

const express = require("express");

// El router es el objeto que nos va a manejar todas las rutas.
const favoritesRouter = express.Router();

// Instanciamos al controlador para usar las funciones relativas a cada ruta.
const { addWine } = require("../controllers/favorites.controller");

const { isAuth } = require("../middlewares/auth.middleware"); // Llamamos a la función de autentificación que servirá de policía (definir quién entra y quién no).

// LAS RUTAS
//nombreDelRouter.tipoDePetición('endpoint', <nombreDeLaFunciónQueVaAResolverEseEndpoint>);

// OBTENER UN VINO
favoritesRouter.post("/:userId", addWine);
// favoritesRouter.get("/:userId", getWinesByUser);

module.exports = favoritesRouter;
