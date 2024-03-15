var mongoose = require("mongoose")
var ActualiteSchema = new mongoose.Schema({
    titre_actualite: {
        type: String,
    },
    description_actualite: {
        type: String,
        required: true
    },
    image_Cover: {
        type: String,

    },
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("actualite", ActualiteSchema)
