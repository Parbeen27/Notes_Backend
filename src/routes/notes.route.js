const express = require("express")
const notesController = require("../controller/notes.controller")
const { isAuthenticated } = require("../middleware/auth.middleware")
const router = express.Router()

router.post("/add",
    isAuthenticated,
    notesController.addTask
)

router.patch("/update/:id",
    isAuthenticated,
    notesController.updateTask
)

router.delete("/delete/:id",
    isAuthenticated,
    notesController.deleteTask
)

router.get("/",
    isAuthenticated,
    notesController.getNotes
)

module.exports = router