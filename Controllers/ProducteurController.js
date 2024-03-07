const Producteur = require("../Models/ProducteurModel")
const { encryptPassword } = require("../Config/CryptPassword");

/************************************** CreateProducteur *************************************** */
const CreateProducteur = async (req, res) => {
    const Images = req.files;
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
        photos_exploitation,
        description_exploitation,
    } = req.body;

    role = "producteur";

    try {
        const allImages = []
        for (const img of Images) {
            allImages.push(img.filename)
        }
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
            photos_exploitation,
            description_exploitation,
            photos_exploitation: allImages,
            role
        });

        await NewProducteur.save();
        res.status(201).json({ message: 'ok bien insérer', producteur: NewProducteur });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


module.exports = { CreateProducteur };
