const asyncHandler = require("../middleware/async.middleware")
const ActivityLog = require("../models/activitylog.model")
const adminService = require("../services/admin.service")
const AppError = require("../utility/error.utils")

exports.getUsers = asyncHandler(async (req,res) => {
    const users = await adminService.getAllUsers(req.query)
    res.json(users)
})

exports.toggleBlockUser = asyncHandler(async (req,res) => {
    
        const adminId = req.user.id
        
        const userId = req.params.id
        const user =  await adminService.toggleBlockUser(adminId, userId)
        
        if(!user){
            throw new AppError("User not Found",404)
        }
        res.json({
            message: "User status update",
            user: user
        })
    
})

exports.deleteUser = asyncHandler(async (req,res) => {
    
        const adminId  = req.user.id
        const userId = req.params.id

        const user = await adminService.deleteUser(adminId,userId)

        if(!user){
            throw new AppError("User not found",404)
        }
        res.json({
            message: "User status update",
            user: user
        })
    
})

exports.changeUserRole = asyncHandler(async (req,res) => {
    const adminId = req.user.id
    const userId = req.params.id
    const { role } = req.body

    const updateUser = await adminService.changeUserRole(
        adminId,
        userId,
        role
    )
    res.json({
        message: "Role updated successfully",
        user: updateUser
    })
})

exports.getActivityLogs = asyncHandler(async (req,res) => {
    const logs = await ActivityLog.find()
    .populate("performedBy","username email")
    .populate("targetUser", "username email")
    .sort({ createdAt: -1})

    res.status(200).json(logs)
})