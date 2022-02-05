const express = require("express")
const indexRouter = express.Router()
const UserController = require("../controllers/userController")

indexRouter.post("/register", UserController.register)

module.exports = indexRouter