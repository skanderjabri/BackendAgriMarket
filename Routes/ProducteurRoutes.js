const express = require("express")
const multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/uploads/producteur")
    },
    filename: function (req, file, cb) {
        cb(null, "Agri_Mar_Ket" + "_" + Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage })



const router = express.Router()
const { CreateProducteur } = require("../Controllers/ProducteurController")
router.post('/SignUpProducteur', upload.any(), CreateProducteur)

module.exports = router 