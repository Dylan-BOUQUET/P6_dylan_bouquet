const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];//Récupération du token du header
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");//Décodage du token
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée !" });
    }
};