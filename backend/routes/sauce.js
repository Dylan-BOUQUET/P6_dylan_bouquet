const express = require("express");
const router = express.Router();

const sauceControllers = require("../controllers/sauce");
const auth = require("../middleware/auth");//Permet de protéger mes routes
const multer = require("../middleware/multer-config");

/*********Logique de routing***********/
router.post("/", auth, multer, sauceControllers.createSauce);
router.post("/:id/like", auth, sauceControllers.likeSauce);
router.put("/:id", auth, multer, sauceControllers.modifySauce);
router.delete("/:id", auth, sauceControllers.deleteSauce);
router.get("/:id", auth, sauceControllers.getOneSauce);
router.get("/", auth, sauceControllers.getAllSauces);
  

module.exports = router;