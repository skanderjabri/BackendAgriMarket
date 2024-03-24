const express = require("express")
const {
    CreateForumComment,
    GetAllForumComment,
    GetAllForumCommentByIdForum,
    LikeDislikeForumComment
} = require("../Controllers/ForumCommentController")

const router = express.Router()
router.post('/CreateForumComment', CreateForumComment)
router.get('/GetAllForumComment', GetAllForumComment)
router.post('/GetAllForumCommentByIdForum/:id', GetAllForumCommentByIdForum)
router.post('/LikeDislikeForumComment', LikeDislikeForumComment)

module.exports = router