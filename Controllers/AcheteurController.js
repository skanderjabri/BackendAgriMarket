const { encryptPassword } = require("../Config/CryptPassword");
const Acheteur = require("../Models/AcheteurModel")
const imageDafult = "test.png"

/************************************** CreateAcheteur *************************************** */
const CreateAcheteur = async (req, res) => {
    const {
        email,
        password,
        nom_representant_entreprise,
        prenom_representant_entreprise,
        telephone_representant_entreprise,
        adresse_representant_entreprise,
        service_representant_entreprise,
        fonction_representant_entreprise,
        nom_entreprise,
        activite_entreprise,
        adresse_entreprise,
        ville_entreprise,
        Description_entreprise,
        code_postale_entreprise,
        email_entreprise,
        telephone_entreprise,
    } = req.body;
    let logo_entreprise = ""
    let image_user = "";

    for (const file of req.files) {
        if (file.fieldname === "logo_entreprise") {
            logo_entreprise = file.filename;
        } else if (file.fieldname === "image_user") {
            image_user = file.filename
        }
    }
    role = "acheteur";

    try {
        const existingAcheteur = await Acheteur.findOne({ email });

        if (existingAcheteur) {
            return res.status(200).json({ message: 'Utilisateur existe !', error: 'Conflict' });
        }

        const CryptPassword = await encryptPassword(password);
        const NewAcheteur = new Acheteur({

            email,
            password: CryptPassword,
            nom_representant_entreprise,
            prenom_representant_entreprise,
            telephone_representant_entreprise,
            adresse_representant_entreprise,
            service_representant_entreprise,
            fonction_representant_entreprise,
            nom_entreprise,
            activite_entreprise,
            adresse_entreprise,
            ville_entreprise,
            Description_entreprise,
            code_postale_entreprise,
            email_entreprise,
            telephone_entreprise,
            logo_entreprise,
            image_user,
            role
        });

        await NewAcheteur.save();
        res.status(201).json({ message: 'ok', acheteur: NewAcheteur });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
/************************************** GetAllAcheteur *************************************** */


const GetAllAcheteur = async (req, res) => {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;

    try {
        const totaleCount = await Acheteur.countDocuments({});
        const skipCount = (page - 1) * limit;
        const ListeAcheteur = await Acheteur.find({})
            .skip(skipCount)
            .limit(limit);
        return res.status(201).json({
            message: 'ok',
            ListeAcheteur: ListeAcheteur,
            totaleCount,
            limit,
            page
        })
    }
    catch (error) {
        res.status(201).json({ message: "error", error })
    }

}
module.exports = { CreateAcheteur, GetAllAcheteur };
