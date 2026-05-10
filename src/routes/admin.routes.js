const express = require("express")
const router = express.Router()

const { isAuthenticated } = require("../middleware/auth.middleware")
const { authorizeRoles } = require("../middleware/role.middleware")

const adminContoller = require("../controller/admin.controller")
const { logAdminAction } = require("../middleware/activitylog.middleware")

router.get("/users",
    isAuthenticated,
    authorizeRoles("admin"),
    adminContoller.getUsers
)
router.patch("/users/block/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    logAdminAction("BLOCK_TOGGLE"),
    adminContoller.toggleBlockUser
)

router.patch("/users/delete/:id/",
    isAuthenticated,
    authorizeRoles("admin"),
    logAdminAction("DELETE_USER"),
    adminContoller.deleteUser
)

router.patch("/users/role/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    logAdminAction("USER_ROLE_CHANGE"),
    adminContoller.changeUserRole
)

router.get("/",
    isAuthenticated,
    authorizeRoles("admin"),
    adminContoller.getActivityLogs
)

module.exports = router