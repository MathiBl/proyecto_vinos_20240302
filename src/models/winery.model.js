const mongoose = require("mongoose");

const winerySchema = new mongoose.Schema({
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

  wines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wine",
    required: false,
  }],
});

const Winery = mongoose.model("Winery", winerySchema);

module.exports = Winery;
