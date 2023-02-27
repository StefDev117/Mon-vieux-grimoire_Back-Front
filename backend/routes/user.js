const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const password = require("../middleware/password");
// ajouter middleware password à signup
router.post("/signup", password, userCtrl.createUser);
router.post("/login", userCtrl.loginUser);


module.exports = router;