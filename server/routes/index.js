const express = require("express")
const indexRouter = express.Router()
const UserController = require("../controllers/userController")

indexRouter.post("/register", UserController.register)
indexRouter.post("/login", UserController.login)

module.exports = indexRouter