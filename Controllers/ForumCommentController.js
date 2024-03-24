const ForumComment = require("../Models/ForumCommentModel");
/************************************** CreateForumComment  *************************************** */


const CreateForumComment = async (req, res) => {
    const {
        comment_forum,
        userId,
        forumId,
    } = req.body;
    try {
        const NewForumComment = new ForumComment({
            comment_forum,
            userId,
            forumId,
        });

        await NewForumComment.save();
        res.status(201).json({ message: 'ok', NewForumComment: NewForumComment });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

/************************************** GetAllForumComment  *************************************** */
const GetAllForumComment = async (req, res) => {

    try {
        const totalCount = await ForumComment.countDocuments({});
        let ListeForumComment = await ForumComment.find({})
            .populate("userId")
            .populate("forumId")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'ok',
            ListeForumComment: ListeForumComment,
            totalCount: totalCount,
        });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};
/************************************** GetAllForumCommentByIdForum  *************************************** */

const GetAllForumCommentByIdForum = async (req, res) => {
    const { id } = req.params
    try {
        let ListeForumComment = await ForumComment.find({ forumId: id })
            .populate("userId")
            .populate("forumId")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'ok',
            ListeForumComment: ListeForumComment,
            totalCount: ListeForumComment.length,
        });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};
/************************************** LikeDislikeForumComment  *************************************** */
const LikeDislikeForumComment = async (req, res) => {
    const { userId, CommentId } = req.body;

    try {
        const comment = await ForumComment.findById(CommentId);
        if (!comment) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }
        const existingLikeIndex = comment.likes.findIndex(like => like.userId.toString() === userId);
        if (existingLikeIndex !== -1) {
            comment.likes.splice(existingLikeIndex, 1);
            await comment.save();
            return res.status(200).json({ message: "Like supprime", comment: comment });
        }
        comment.likes.push({ userId: userId });
        await comment.save();
        return res.status(200).json({ message: "Like ajoute", comment: comment });
    } catch (error) {
        return res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};


module.exports = {
    CreateForumComment,
    GetAllForumComment,
    GetAllForumCommentByIdForum,
    LikeDislikeForumComment
}
