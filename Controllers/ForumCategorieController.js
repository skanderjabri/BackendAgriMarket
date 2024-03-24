const ForumCategorie = require("../Models/ForumCategorieModel");
/************************************** CreateForumCategorie  *************************************** */


const CreateForumCategorie = async (req, res) => {
    const {
        nom_categorie_forum,
        description_categorie_forum,
    } = req.body;
    try {
        const NewForumCategorie = new ForumCategorie({
            nom_categorie_forum,
            description_categorie_forum,
        });

        await NewForumCategorie.save();
        res.status(201).json({ message: 'ok', NewForumCategorie: NewForumCategorie });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
/************************************** GetAllForumCategorie  *************************************** */

const GetAllForumCategorie = async (req, res) => {

    try {

        const ListeForumCategorie = await ForumCategorie.find({})
            .sort({ createdAt: -1 })

        return res.status(201).json({
            message: 'ok',
            ListeForumCategorie: ListeForumCategorie,
        })
    }
    catch (error) {
        res.status(201).json({ message: "error", error })
    }
}


module.exports = { CreateForumCategorie, GetAllForumCategorie }