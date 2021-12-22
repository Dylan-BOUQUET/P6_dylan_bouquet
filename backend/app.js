const express = require('express');
const bodyParser = require("body-parser");//Extraction de l'objet Json de la demande
const mongoose = require("mongoose");
const path = require("path");

/*******Importation du routeur*****/
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Logique de connexion à MongoDB //
mongoose.connect("mongodb+srv://dylan:dylan@api-secure-cluster.2w8uz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));

const app = express();

/**********Gestion de CORS, ajout des headers pour gérer la double origine (localhost:3000 et 4200)**************/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//Accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Ajout des headers mentionnées aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Envoie des requêtes avec les méthodes mentionnées
    next();
});

app.use(bodyParser.json());//Middleware global de la fonction json

/********Importation des routes*********/
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);



module.exports = app;