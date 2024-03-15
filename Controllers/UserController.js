const User = require("../Models/UserModel")
const bcrypt = require("bcrypt");
/******************************************************************Login*******************************************************************************/

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(201).json({ message: "Utilisateur non trouve" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(201).json({ message: "Mot de passe incorrect" });
        }
        res.status(201).json({ message: "ok", user, user });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
};

module.exports = { LoginUser }