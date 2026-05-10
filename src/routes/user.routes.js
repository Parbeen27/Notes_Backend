const express = require("express")
const userController = require("../controller/user.controller")
const { isAuthenticated } = require("../middleware/auth.middleware")

const router = express.Router()

router.patch("/update/username",
    isAuthenticated,
    userController.updateProfile
)

router.patch("/update/password",
    isAuthenticated,
    userController.updatePassword
)

router.get(
    "/me",
    isAuthenticated,
    userController.getUser
)

module.exports = router