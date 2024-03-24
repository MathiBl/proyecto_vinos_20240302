// PROCESO
//En index.js, va a llegar una petición y se va a manejar. Index va a llamar a las rutas. La ruta va a indentificar que tipo de petición es, lo va a derivar al controlador y el controlador, para trabajar, va a utilizar el modelo para cumplir con los requisitos de la aplicación (que datos tienen que aparecer?).

// librerías importadas
const express = require("express");
const cors = require("cors");
// componentes "nuestros" que vamos a utilizar
const HTTPSTATUSCODE = require("./utils/httpStatusCode");
const { connectMongo } = require("./utils/db");

// LLAMAMOS A LAS RUTAS
const wineRouter = require("./src/routes/wine.routes");

const userRouter = require("./src/routes/user.routes"); // Eso lo comento de momento, es lo que vimos hoy

const wineryRouter = require("./src/routes/winery.routes");
// const userRouter = require("./src/routes/user.routes");

const PORT = 3000;

// CONFIGURACION
connectMongo();
const app = express();

// app.use(mongoSanitize()); // ESTO NO HACE FALTA
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true,
  })
);

// SI USÁRAMOS CORS PARA RESTRINGIR ACCESOS, SERÍA ASÍ.
app.use(cors()); // sin restricciones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// FALTA app.set("secretKey")

/* ROUTES */
app.use("/wine", wineRouter);

app.use("/user", userRouter);

app.use("/winery", wineryRouter);

// app.use("/favorites", favoritesRouter); // COMENTAMOS ESA FUNCIÓN QUE NO FUNCIONA DE MOMENTO

// app.use("/user", userRouter);
app.use(express.urlencoded({ extended: true }));

// ruta de bienvenida
//Aquí tenemos una ruta y un mimi controlador, está todo junto.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my server",
    app: "My App",
  });
});

/* MANEJO DE ERRORES */

app.use((req, res, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error); // El next va a derivar el error y su tipo a su padre
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.disable("x-powered-by"); // ocultar al público que usamos nodejs.

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
