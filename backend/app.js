const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const rateLimit = require("express-rate-limit");

const dotEnv = require("dotenv").config();

const completeRoute = (process.env.COMPLETEROUTE);

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const limiterDatas = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 300, //Limit each Ip to 300 requests per 15min
  message: "Trop de requêtes API lancées (300 dans les 15 dernières minutes)."
});


mongoose.connect(completeRoute,
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
app.use("/api/books", limiterDatas, stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
