const Forum = require("../Models/ForumModel");
const imageDafult = "test.png"
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

        ListeForum = ListeForum.map(forum => ({
            ...forum.toObject(),
            NbresVues: forum.vues.length,
            NbresLikes: forum.likes.length
        }));

        return res.status(200).json({
            message: 'OK',
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
            message: 'OK',
            forum: forum,
        });
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
};



module.exports = {
    CreateForum,
    GetAllForum,
    AddVuToForum,
    GetSingleForum
}