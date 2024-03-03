const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  appellation: {
    // denominación de origen
    type: String,
    required: true,
    trim: true,
  },

  winery: {
    // bodega
    // Eso es lo que vimos antes
    // type: String,
    // required: true,
    // trim: true,
    // A continuación, es como lo tenemos que hacer
    type: mongoose.Schema.Types.ObjectId,
    ref: "Winery",
  },

  type: {
    //blanco, tinto, etc
    type: String,
    required: true,
    trim: true,
  },

  vintage: {
    // añada
    type: Number,
    required: true,
    trim: true,
  },

  grape: {
    // uva
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    trim: true,
  },

  tasting: {
    type: String,
    required: true,
    trim: true,
  },
});
const Wine = mongoose.model("Wine", wineSchema);
module.exports = Wine;
