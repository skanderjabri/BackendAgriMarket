const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
    {

        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true

        },
        role: {
            type: String,
            enum: ['admin', 'producteur', 'acheteur']
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("user", UserSchema)