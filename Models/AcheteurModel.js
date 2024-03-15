var mongoose = require("mongoose")
const User = require("./UserModel")
var AcheteurSchema = new mongoose.Schema({
    nom_representant_entreprise: {
        type: String,
    },
    prenom_representant_entreprise: {
        type: String,
        required: true
    },
    telephone_representant_entreprise: {
        type: Number,
    },
    adresse_representant_entreprise: {
        type: String,
    },
    service_representant_entreprise: {
        type: String, // Direction générale , Direction commerciale, Service des Achats ,Direction technique , Direction export , Direction logistique , 
    },
    fonction_representant_entreprise: {
        type: String,  //  Directeur , Fournisseur , Distributeur en gros , Responsable commercial , Restaurateur , Exportateur
    },
    nom_entreprise: {
        type: String,
    },
    activite_entreprise: {
        type: String, // Supermarché , Centrale d'achat , Restaurants , Distributeurs alimentaires ,  Marchés de gros , Exportateurs , Industrie agroalimentaire
    },
    adresse_entreprise: {
        type: String,
    },
    ville_entreprise: {
        type: String,
    },
    code_postale_entreprise: {
        type: String,
    },
    Description_entreprise: {
        type: String,
    },
    email_entreprise: {
        type: String,
    },
    telephone_entreprise: {
        type: Number,
    },
    logo_entreprise: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);
module.exports = User.discriminator("acheteur", AcheteurSchema)
