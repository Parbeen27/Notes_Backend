const mongoose = require("mongoose")
const taskModel = require("../models/tasks")
const asyncHandler = require("../middleware/async.middleware")

exports.addTask = asyncHandler(async(req,res) => {
    const { title, task } = req.body
    const userId = req.user.id
    const note = await taskModel.create({
        userId,
        title,
        task
    })

    res.json({
        message: "Note added successfully",
        note
    })

})

exports.updateTask = asyncHandler(async(req,res) => {
    const { title, task } = req.body
    const userId = req.user.id
    const noteId = req.params.id
    const note = await taskModel.findById(noteId)
    if(!note) return

    note.title = title
    note.task = task

    await note.save()

    res.json({
        message: "Note Updated successfullt",
        note
    })
})

exports.deleteTask = asyncHandler(async(req,res) => {
    const noteId = req.params.id
    const note = await taskModel.findByIdAndDelete(noteId)
    if(!note) return
    res.json({
        message: "Note deleted successfully",
        note
    })
})

exports.getNotes = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const notes = await taskModel.find({
        userId: userId
    })
    if (!notes) return;
    res.json({
        message: "Notes Fetched successfully",
        notes
    })
})