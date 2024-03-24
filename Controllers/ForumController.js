const Forum = require("../Models/ForumModel");
const ForumComment = require("../Models/ForumCommentModel");
const imageDafult = "test.png"
const mongoose = require("mongoose")
/************************************** CreateForum  *************************************** */
const CreateForum = async (req, res) => {
    const {
        titre_forum,
        description_forum,
        userId,
        categorieId
    } = req.body;
    const image_Cover = req.file ? req.file.filename : imageDafult;

    try {
        const NewForum = new Forum({
            titre_forum,
            description_forum,
            userId,
            categorieId,
            image_Cover
        });

        await NewForum.save();
        res.status(201).json({ message: 'ok', NewForum: NewForum });
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};

/************************************** GetAllForum  *************************************** */
const GetAllForum = async (req, res) => {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;

    try {
        const totalCount = await Forum.countDocuments({});
        const skipCount = (page - 1) * limit;
        let ListeForum = await Forum.find({})
            .populate("categorieId")
            .populate("userId")
            .populate({
                path: "vues",
                populate: {
                    path: "userId",
                    model: "user"
                }
            })
            .sort({ createdAt: -1 })
            .skip(skipCount)
            .limit(limit);

        for (let i = 0; i < ListeForum.length; i++) {
            const forumId = ListeForum[i]._id;
            const countComments = await ForumComment.countDocuments({ forumId });
            // Ajout dynamique du champ NbresCommentaires à l'objet forum
            ListeForum[i]._doc.NbresCommentaires = countComments;
        }

        ListeForum = ListeForum.map(forum => ({
            ...forum.toObject(),
            NbresVues: forum.vues.length,
            NbresLikes: forum.likes.length
        }));

        return res.status(200).json({
            message: 'ok',
            ListeForum: ListeForum,
            totalCount: totalCount,
            limit: limit,
            page: page
        });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

/************************************** AddVuToForum  *************************************** */
const AddVuToForum = async (req, res) => {
    const { idUser, forumId } = req.body;

    try {
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(201).json({ message: "Forum non trouvee" });
        }
        const existingUser = forum.vues.find(vue => vue.userId.toString() === idUser);
        if (existingUser) {
            return res.status(400).json({ message: "vu existe" });
        }
        forum.vues.push({ userId: idUser });
        await forum.save();
        return res.status(200).json({ message: "ok", forum: forum });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};
/************************************** GetSingleForum  *************************************** */
const GetSingleForum = async (req, res) => {
    const { idForum } = req.params
    try {
        let forum = await Forum.findById(idForum)
            .populate("categorieId")
            .populate("userId")
            .populate({
                path: "vues",
                populate: {
                    path: "userId",
                    model: "user"
                }
            });

        /*const vuesLength = forum.vues.length;
        const likesLength = forum.likes.length; */
        forum = forum.toObject();
        forum.NbresVues = forum.vues.length;
        forum.NbresLikes = forum.likes.length;

        return res.status(200).json({
            message: 'ok',
            forum: forum,
        });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};


/************************************** LikeDislikeForum  *************************************** */
const LikeDislikeForum = async (req, res) => {
    const { userId, ForumId } = req.body;

    try {
        const forum = await Forum.findById(ForumId);
        if (!forum) {
            return res.status(404).json({ message: "forum non trouvé" });
        }
        const existingLikeIndex = forum.likes.findIndex(like => like.userId.toString() === userId);
        if (existingLikeIndex !== -1) {
            forum.likes.splice(existingLikeIndex, 1);
            await forum.save();
            return res.status(200).json({ message: "Like supprime", forum: forum });
        }
        forum.likes.push({ userId: userId });
        await forum.save();
        return res.status(200).json({ message: "Like ajoute", forum: forum });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};

module.exports = {
    CreateForum,
    GetAllForum,
    AddVuToForum,
    GetSingleForum,
    LikeDislikeForum,
}