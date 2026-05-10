const User = require("../models/user.model")

exports.getAllUsers = async (query) => {
    const { page = 1, limit = 50} = query

    return await User.find({
        isDeleted: false
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-password")
}
exports.toggleBlockUser = async (adminId, userId) => {
    const user = await User.findById(userId)

    if(!user) return null;

    user.isBlocked = !user.isBlocked

    await user.save()

    return user
}

exports.changeUserRole = async (adminId, userId, newRole) => {
    const adminsCount = await User.countDocuments({role: "admin"})

    const allowedRoles = ["user","admin"]

    if(!allowedRoles.includes(newRole)){
        throw new AppError("Invalid role",400)
    }
    const user = await User.findById(userId)

    if(user.role === "admin" && newRole !== "admin" && adminsCount <= 1){
        throw new AppError("Cannot remove last admin", 400)
    }
    if(!user){
        throw new AppError("User not found", 404)
    }

    if(adminId === userId){
        throw new AppError("You cannot change your own role", 400)
    }
    user.role = newRole;
    await user.save()

    return user
}

exports.deleteUser = async (adminId, userId) => {
    const user = await User.findById(userId)
    if(!user) return null;

    user.isDeleted = true
    await user.save()

    return user
}