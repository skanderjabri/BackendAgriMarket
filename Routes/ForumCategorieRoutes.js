const express = require("express")
const { CreateForumCategorie, GetAllForumCategorie } = require("../Controllers/ForumCategorieController")

const router = express.Router()

router.post('/CreateForumCategorie', CreateForumCategorie)
router.post('/GetAllForumCategorie', GetAllForumCategorie)
module.exports = router