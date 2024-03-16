var mongoose = require("mongoose")
var ForumSchema = new mongoose.Schema({
    titre_forum: {
        type: String,
    },
    description_forum: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    image_Cover: {
        type: String
    },
    is_verified: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: []
    },
    vues: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            status: {
                type: Number,
                default: 0
            }
        }],
        default: []
    },
    likes: {
        type: [{
            userId: {  
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            status: {
                type: Number,
                default: 0
            }
        }],
        default: []
    },

    categorieId: {
        type: mongoose.Schema.ObjectId,
        ref: "forumcategorie"
    }
},
    {
        timestamps: true,
    },

);
module.exports = mongoose.model("forum", ForumSchema)
