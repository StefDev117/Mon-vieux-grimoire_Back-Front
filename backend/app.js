const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");



mongoose.connect('mongodb+srv://stefDev117:bordeaux33@mon-vieux-grimoire.nujfefc.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !!!'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));

const app = express();



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
// app.use(bodyParser.json());

app.use("/api/books", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;


//anciennes routes POST AND GET

// app.post("/api/books", (req, res, next) => {
//   console.log("route post");
//   res.status(201).json({
//     message: "Objet créé !",
//   });
// });

// app.get("/api/books", (req, res, next) => {
//   const book = [
//     {
//       userId: "1",
//       title: "titre du livre",
//       author: "auteur du livre",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       year: 2001, //N
//       genre: "genre du livre",
//       ratings: [
//         {
//           userId: "1",
//           grade: 3, //N
//         },
//         {
//           userId: "12",
//           grade: 4, //N
//         },
//       ],
//       averageRating : 1.8 //N
//     },
//     {
//       userId: 2,
//       title: "Mon deuxième livre",
//       description: "Les infos de mon deuxième objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       userId: "qsomihvqiosreg",
//       year: 1980,
//       author: "Dostoievski",
//       ratings: [
//         {
//           userId: "qsomihvqiosreg",
//           grade: 5,
//         },
//       ],
//       genre: `test`,
//     },
//     {
//       userId: 3,
//       title: "Mon troisième livre",
//       description: "Les infos de mon deuxième objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       userId: "qsomihvqiosreg",
//       year: 2005,
//       author: "Eryc Nylund",
//       ratings: [
//         {
//           userId: "qsomihvzdazzq",
//           grade: 6,
//         },
//       ],
//       genre: `test`,
//     },
//   ];
//   res.status(200).json(book);
// });

