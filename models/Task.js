const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a task"],
    trim: true,
    minlength: [2, "task must be greater than 2 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model("Task", TaskSchema)
