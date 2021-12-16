const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");   //Evite d'avoir plusieurs utilisateurs avec la même adresse email

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },  //Unique empêche de s'inscrire plusieurs fois avec la même adresse mail mais il faut en plus le package mongoose unique validator
    password: { type: String, required: true }
});


userSchema.plugin(uniqueValidator); //Appel de la méthode plugin


module.exports = mongoose.model("User", userSchema);    //Export du schéma en tant que modèle Mongoose