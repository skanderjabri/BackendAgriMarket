var mongoose = require("mongoose")
var ForumCommentSchema = new mongoose.Schema({
    comment_forum: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    forumId: {
        type: mongoose.Schema.ObjectId,
        ref: "forum"
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
    is_verified: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("forumcomment", ForumCommentSchema)
