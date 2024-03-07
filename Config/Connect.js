const mongoose = require("mongoose");
require("dotenv").config();
mongoose
    .connect(process.env.DATABASE_CLOUD)
    .then(() => {
        console.log("Connecté à la base de données");
    })
    .catch(() => {
        console.log((err) =>
            console.error("Erreur de connexion à la base de données :", err)
        );
    });
module.exports = mongoose;
