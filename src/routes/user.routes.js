const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  authenticate,
  logout,
  getUsers,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth.middleware");

userRouter.post("/register", createUser);
userRouter.post("/authenticate", authenticate); // obtener un token
userRouter.post("/logout", [isAuth], logout);
userRouter.get("/users", getUsers); //este hay que borrarlo antes de pasar a producción.

module.exports = userRouter;
