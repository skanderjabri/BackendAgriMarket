const Producteur = require("../Models/ProducteurModel")
const { encryptPassword } = require("../Config/CryptPassword");
const imageDafult = "test.png"
/************************************** CreateProducteur *************************************** */
const CreateProducteur = async (req, res) => {
    const {
        email,
        password,
        nom_producteur,
        prenom_producteur,
        telephone,
        adresse,
        nom_exploitation_agricole,
        type_de_culture,
        emplacement_de_exploitation,
        superficie_terres_agricoles,
        modes_production,
        certifications,
        description_exploitation,
    } = req.body;

    role = "producteur";
    const photos_exploitation = [];
    let image_user = "";

    for (const file of req.files) {
        if (file.fieldname === "image_user") {
            image_user = file.filename;
        } else if (file.fieldname === "photos_exploitation") {
            photos_exploitation.push(file.filename);
        }
    }

    try {

        const existingProducteur = await Producteur.findOne({ email });

        if (existingProducteur) {
            return res.status(200).json({ message: 'Utilisateur existe !', error: 'Conflict' });
        }

        const CryptPassword = await encryptPassword(password);
        const NewProducteur = new Producteur({
            email,
            password: CryptPassword,
            nom_producteur,
            prenom_producteur,
            telephone,
            adresse,
            nom_exploitation_agricole,
            type_de_culture,
            emplacement_de_exploitation,
            superficie_terres_agricoles,
            modes_production,
            certifications,
            description_exploitation,
            photos_exploitation,
            image_user,
            role
        });

        await NewProducteur.save();
        res.status(201).json({ message: 'ok', producteur: NewProducteur });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


module.exports = { CreateProducteur };
