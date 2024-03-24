const Contact = require("../Models/ContactModel");
/************************************** CreateContact *************************************** */
const CreateContact = async (req, res) => {
    const { nom, email, sujet, contenu } = req.body;


    try {
        const NewContact = new Contact({
            nom,
            email,
            sujet,
            contenu
        });

        await NewContact.save();
        res.status(201).json({ message: 'ok', NewContact: NewContact });
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};

module.exports = { CreateContact }