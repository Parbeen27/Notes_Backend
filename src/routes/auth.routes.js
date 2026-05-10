const express = require("express")
const { registerUser, Login, checkLogin, refreshToken } = require("../controller/auth.controller")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",Login)
router.get("/checklogin",checkLogin)
router.post("/refresh",refreshToken)

module.exports = router