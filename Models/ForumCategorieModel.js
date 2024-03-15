var mongoose = require("mongoose")
var ForumCategorieSchema = new mongoose.Schema({
    nom_categorie_forum: {
        type: String,
    },
    description_categorie_forum: {
        type: String,
        required: true
    },
    is_verified: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    },

);
module.exports = mongoose.model("forumcategorie", ForumCategorieSchema)
