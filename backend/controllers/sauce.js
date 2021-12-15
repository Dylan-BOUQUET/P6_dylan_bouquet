const Sauce = require("../models/Sauce");

/***********Logique métier de mes routes************/
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;//Retire le champ id du corps de la requête
    const sauce = new Sauce({
        ...sauceObject,//Copie les infos qui sont dans le corps de la requête
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` //Génération de l'URL de l'image
    });
    sauce.likes = 0;
    sauce.dislikes = 0;
    sauce.save()//Cette méthode enregistre mon objet Sauce dans la base de données
        .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.body.like == 1) {
                if (sauce.usersLiked.indexOf(req.body.userId) < 0) {//Si utilisateur n'existe pas :
                    sauce.likes = sauce.likes + 1;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({ message: "Like enregistré !" }))
                        .catch(error => res.status(400).json({ error }));
                }
            } else if (req.body.like == -1) {
                if (sauce.usersDisliked.indexOf(req.body.userId) < 0) {
                    sauce.dislikes = sauce.dislikes + 1;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({ message: "Dislike enregistré !" }))
                        .catch(error => res.status(400).json({ error }))
                }
            } else {
                if (sauce.usersLiked.indexOf(req.body.userId) >= 0) {//Si utilisateur existe :
                    sauce.likes = sauce.likes - 1;
                    sauce.usersLiked.splice(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({ message: "Like supprimé !" }))
                        .catch(error => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.indexOf(req.body.userId) >= 0) {
                    sauce.dislikes = sauce.dislikes - 1;
                    sauce.usersDisliked.splice(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({ message: "Dislike supprimé !" }))
                        .catch(error => res.status(400).json({ error }))
                }
            }
        })
        .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
        .catch(error => res.status(404).json(error));
};

exports.deleteSauce = (req, res) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
        .catch(error => res.status(400).json(error));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};