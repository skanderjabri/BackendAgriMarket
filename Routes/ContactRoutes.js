const express = require("express")
const router = express.Router()
const { CreateContact } = require("../Controllers/ContactController")
router.post('/CreateContact', CreateContact)

module.exports = router