const express = require("express")
const multer = require("multer")
const {
    CreateForum,
    GetAllForum,
    AddVuToForum,
    GetSingleForum,
    LikeDislikeForum
} = require("../Controllers/ForumController")


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/uploads/forums")
    },
    filename: function (req, file, cb) {
        cb(null, "Agri_Mar_Ket" + "_" + Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage })



const router = express.Router()
router.post('/CreateForum', upload.single("image_Cover"), CreateForum)
router.get('/GetAllForum', GetAllForum)
router.post('/AddVuToForum', AddVuToForum)
router.get('/GetSingleForum/:idForum', GetSingleForum)
router.post('/LikeDislikeForum', LikeDislikeForum)

module.exports = router