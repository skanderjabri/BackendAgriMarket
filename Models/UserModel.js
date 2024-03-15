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
        },
        is_blocked: {
            type: String,
            default: "0",
        },
        is_verified: {
            type: String,
            default: "0",
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("user", UserSchema)