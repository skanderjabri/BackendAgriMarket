const express = require("express")
const router = express.Router()
const { LoginUser } = require("../Controllers/UserController")
router.post('/LoginUser', LoginUser)

module.exports = router