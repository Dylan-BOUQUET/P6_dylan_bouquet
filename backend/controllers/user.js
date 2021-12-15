const bcrypt = require("bcrypt"); // Packaqge de cryptage pour les mots de passe)

const jwt = require("jsonwebtioken");
const user = require("../models/user");

const user = require("../models/user");

exports.signup = (req, res, next) => { // Fonction qui permet de créer de nouveaux utilisateurs dans la base de donées
    bcrypt.hash(req.body.password, 10) // Cryptage et hachage du mot de passe avec 10 tours
        .then(hash => {
            const user = new user({ // Création Nouveau utilisateur
                email: req.body.email,
                password: Hash
            });
            user.save() // Enregistrement du user dans la base de donées
                .then(() => res.status(201).json({message: "Utilisateur crée !"}))
                .catch(error => res.status(400).json({error}));
        })
        .cactch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => { //Fonction qui permet à l'utilisateur existant de se connecter
user.findOne({email: req.body.email})
    .then(user =>  {
        if (!user) {
            return res.status(401).json({error: "Utilisateur non trouvé"});
        }
        bcrypt.compare(req.body.password, user.password) // Comparaison du mot de passe avec brcypt et la fonction compare
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({error: "Mot de passe incorrect"})
                }
                res.status(200).json({ // Requête OK
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        "RANDOM_TOKEN_SECRET",
                        {expiresIn: "24h"}
                    )
                });
            })
            .catch(error => res.status(500).json({error})); // Erreur serveur
        })
        .catch(error => res.status(500).json({error})); // Erreur serveur
    };