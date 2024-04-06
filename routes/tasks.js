const express = require("express")
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks")
const router = express.Router()

router.get("/", getAllTasks)
router.post("/", createTask)
router.get("/:taskId", getTask)
router.patch("/:taskId", updateTask)
router.delete("/:taskId", deleteTask)

module.exports = router
