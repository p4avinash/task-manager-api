const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")

//get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find({})
  res.json({ tasks: allTasks })
})

//create a task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

//get task by id
const getTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params

  const singleTask = await Task.findOne({
    _id: taskId,
  })

  if (!singleTask) {
    return next(createCustomError(`No task found with id: ${taskId}`, 404))
  }
  res.status(200).json({ task: singleTask })
})

//update a task
const updateTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params
  const { name } = req.body

  const singleTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!singleTask) {
    res.status(404).json({ message: `No task found with id: ${taskId}` })
  }

  res.status(200).json({ singleTask })
})

//delete a tasks
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params

  const singleTask = await Task.findOneAndDelete({
    _id: taskId,
  })

  if (!singleTask) {
    return res.status(404).json({ message: `No task found with id: ${taskId}` })
  }
  res
    .status(200)
    .json({ message: `Task with id: ${taskId} deleted successfully` })
})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }
