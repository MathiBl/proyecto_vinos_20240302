const favoritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },

  wines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wine",
      required: false,
    },
  ],
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
