const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  userId: { type: String},
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String },
  ratings: [
    {
      userId: { type: String},
      grade: { type: Number}
    },
  ],
  averageRating: { type: Number},
  //PS: nous devrons sûrement supprimer certains champs qui sont générés par le backend
});

module.exports = mongoose.model("Book", bookSchema);


