const connectDB = require("./db/connect")
const express = require("express")
const tasksRoute = require("./routes/tasks")
require("dotenv").config()
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const app = express()

//middleware
app.use(express.static("./public"))
app.use(express.json())

//routes
app.use("/api/v1/tasks", tasksRoute)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_URL)
    app.listen(port, () => console.log(`server listening on port: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
