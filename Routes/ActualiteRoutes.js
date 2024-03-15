const express = require("express")
const multer = require("multer")
const { CreateActualite, GetAllActualite, GetSingleActualite } = require("../Controllers/ActualiteController")


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/uploads/actualites")
    },
    filename: function (req, file, cb) {
        cb(null, "Agri_Mar_Ket" + "_" + Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage })



const router = express.Router()
router.post('/CreateActualite', upload.single("image_Cover"), CreateActualite)
router.post('/GetAllActualite', GetAllActualite)
router.get('/GetSingleActualite/:id', GetSingleActualite)

module.exports = router