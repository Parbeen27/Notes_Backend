const asyncHandler = require("../middleware/async.middleware")
const userService = require("../services/user.service")
exports.updateProfile = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const { username } = req.body
    const updateUser = await userService.updateUser(userId,{ username })
    
    res.json({
        message: "Username updated successfully",
        username: updateUser.username
    })
})

exports.updatePassword = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const { currentPassword, newPassword } = req.body
    const updateUser = await userService.updateUser(userId,{
        currentPassword,
        newPassword
    })

    res.json({
        message: "User Password updated successfully",
        username: updateUser
    })
})

exports.getUser = asyncHandler(async(req,res) => {
    const user = await userService.getUser(req.user.id)
    console.log(user);
    
    res.json({
        loggedIn: true,
        id:user.id,
        username: user.username,
        email: user.email,
        role: user.role
    })
})