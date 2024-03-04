const mongoose = require("mongoose");

const winerySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  winemaker: {
    type: String,
    // required: true,
    trim: true,
  },
});

const Winery = mongoose.model("Winery", winerySchema);

module.exports = Winery;
