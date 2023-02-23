const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/stuff");

router.get("/", stuffCtrl.getAllBooks);
router.get("/bestrating", auth, stuffCtrl.getBestBooks);
router.post("/", auth, multer, stuffCtrl.createBook);
router.post("/:id/rating", auth, stuffCtrl.postRating);
router.get("/:id", stuffCtrl.getOneBook);
router.put("/:id", auth, multer, stuffCtrl.modifyBook);
router.delete("/:id", auth, stuffCtrl.deleteBook);



module.exports = router;