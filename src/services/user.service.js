const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const AppError = require("../utility/error.utils")

exports.updateUser = async(userId,data) => {
    const user = await User.findById(userId)
    if(!user){
        throw new AppError("user not found",404)
    }
    if(data.username && data.username !== user.username){
        const existingUser = await User.findOne({
            username: data.username
        })
        if(existingUser){
            throw new AppError("Username already taken",404)
        }
        user.username = data.username
    }

    if(data.currentPassword && data.newPassword){
        const isMatch = await bcrypt.compare(data.currentPassword,user.password)
        if(!isMatch){
            throw new AppError("Current password is incorrect",400)
        }
        if(data.currentPassword === data.newPassword){
            throw new AppError("New Password cannot be same as old password",400)
        }
        const hash = await bcrypt.hash(data.newPassword, 10)
        user.password = hash
    }
    await user.save()

    return {
        id: user._id,
        username: user.username
    }
}

exports.getUser = async(userId) => {
    const user = await User.findById(userId).select("-password")
    if(!user){
        throw new AppError("User not found",400)
    }
    return {
        loggedIn: true,
        id:user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
}