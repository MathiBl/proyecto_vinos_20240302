const mongoose = require("mongoose");

const pass =
  "mongodb+srv://juanmagtoro1:FPOjEf8Lo8bo3oXO@cluster0.m2hhdtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(pass);
    console.log("INFO: Conexión a BD correcta:", conn.connection.name);
  } catch (error) {
    console.log("ERROR: (f connectMongo) ->", error.message);
  }
};
module.exports = { connectMongo };
