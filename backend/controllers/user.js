const bcrypt = require("bcrypt");//Package de cryptage pour les mots de passe
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {//Fonction signup pour création de nouveaux users dans la base de données
    bcrypt.hash(req.body.password, 10)//Cryptage/hachage du mot de passe avec 10 tours
        .then(hash => { 
            const user = new User({//Création nouveau user
                email: req.body.email,
                password: hash
            });
            user.save()//Enregistrement du user dans la base de données
                .then(() => res.status(201).json({message: "Utilisateur créé !"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {//Fonction login pour connecter des users existants
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: "Utilisateur non trouvé !"});   
            }
            bcrypt.compare(req.body.password, user.password)//Comparaison du mot de passe avec bcrypt et la fonction compare
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect !"})
                    }
                    res.status(200).json({//Requête OK 
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            "RANDOM_TOKEN_SECRET",
                            {expiresIn: "24h"}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));//Erreur serveur
        })
        .catch(error => res.status(500).json({error}));//Erreur serveur
};