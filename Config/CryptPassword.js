const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

module.exports = { encryptPassword };
