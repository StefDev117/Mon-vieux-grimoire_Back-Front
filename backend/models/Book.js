const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  // id: { type: String, required: true },
  userId: { type: String},
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },//N
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true},
      grade: { type: Number, required: true}, //N
    },
  ],
  averageRating: { type: Number, required: true },//N
  //PS: nous devrons sûrement supprimer certains champs qui sont générés par le backend
});

module.exports = mongoose.model("Book", bookSchema);



  // userId: "1",
  // title: "titre du livre",
  // author: "auteur du livre",
  // imageUrl:
  //   "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
  // year: 2001, //N
  // genre: "genre du livre",
  // ratings: [
  //   {
  //     userId: "1",
  //     grade: 3, //N
  //   },
  //   {
  //     userId: "12",
  //     grade: 4, //N
  //   },
  // ],
  // averageRating : 1.8 //N


