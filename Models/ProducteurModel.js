var mongoose = require("mongoose")
const User = require("./UserModel")
var ProducteurSchema = new mongoose.Schema({
    nom_producteur: {
        type: String,
    },
    prenom_producteur: {
        type: String,
    },
    telephone: {
        type: Number,
    },
    adresse: {
        type: String,
    },
    nom_exploitation_agricole: {
        type: String,
    },
    type_de_culture: {
        type: String,
    },
    emplacement_de_exploitation: {
        type: String,
    },
    superficie_terres_agricoles: {
        type: Number,
    },
    modes_production: { // Conventionnel, biologique, etc
        type: String,
    },
    certifications: {    // Bio, Label Rouge, etc.
        type: String,
    },
    photos_exploitation: {
        type: [String],
    },
    description_exploitation: {
        type: String
    }
},
    {
        timestamps: true,
    }
);
module.exports = User.discriminator("producteur", ProducteurSchema)
