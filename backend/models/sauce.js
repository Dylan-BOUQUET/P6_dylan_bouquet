const mongoose = require("mongoose");


//Création du schéma de données
const sauceSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
  name: {type: String, required: true},
  manufacturer: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  mainPepper: {type: String, required: true},
  heat: {type: Number, required: true},
  likes: {type: Number, required: false},
  dislikes: {type: Number, required: false},
  usersLiked: {type: [String], required: false},
  usersDisliked: {type: [String], required: false}
});


module.exports = mongoose.model("Sauce", sauceSchema);//Export du schéma en tant que modèle Mongoose