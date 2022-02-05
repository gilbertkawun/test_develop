const { User } = require("../models/index")
const { compareHashWithPlain } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")

class UserController {
    static async register(req, res, next) {
        try {
            const currentMood = "undefined"

            const { email, password, username } = req.body

            const result = await User.create({
                email, password, username, currentMood
            })

            res.status(201).json({ id: result.id, email: result.email })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController