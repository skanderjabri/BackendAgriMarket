const Actualite = require("../Models/ActualiteModel");
const imageDafult = "test.png"
/************************************** CreateActualité *************************************** */


const CreateActualite = async (req, res) => {
    const {
        titre_actualite,
        description_actualite,
    } = req.body;
    const image_Cover = req.file ? req.file.filename : imageDafult;


    try {
        const NewActualite = new Actualite({
            titre_actualite,
            description_actualite,
            image_Cover
        });

        await NewActualite.save();
        res.status(201).json({ message: 'ok', NewActualite: NewActualite });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const GetAllActualite = async (req, res) => {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;

    try {

        const totaleCount = await Actualite.countDocuments({});
        const skipCount = (page - 1) * limit;
        const ListeActualite = await Actualite.find({})
            .sort({ createdAt: -1 })
            .skip(skipCount)
            .limit(limit);

        return res.status(201).json({
            message: 'ok',
            ListeActualite: ListeActualite,
            totaleCount,
            limit,
            page
        })
    }
    catch (error) {
        res.status(201).json({ message: "error", error })
    }
}


const GetSingleActualite = async (req, res) => {
    try {
        const { id } = req.params;
        const actualite = await Actualite.findOne({ _id: id })

        res.status(200).send({ message: "ok", actualite: actualite });
    } catch (error) {
        res.status(500).send({ msg: "Erreur lors de la récupération des données" });
    }
};

module.exports = { CreateActualite, GetAllActualite, GetSingleActualite }

