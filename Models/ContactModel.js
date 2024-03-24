const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema(
    {
        nom: {
            type: String,
        },
        email: {
            type: String,
        },
        sujet: {
            type: String
        },
        contenu: {
            type: String,
        },
        status: {
            type: Number,
            default: 0
        },
        reponse: {
            type: String,
            default: ''
        },
    },
    {
        timestamps: true,
    }
);
const Contactmodel = mongoose.model("contact", ContactSchema)
module.exports = Contactmodel;