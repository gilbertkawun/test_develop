const { User } = require("../models/index")
const { reGeneratePayload } = require("../helpers/jwt")

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const payload = reGeneratePayload(access_token)
        const user = await User.findOne({ where: payload.id })
        req.currentUser = {
            id: user.id,
            currentMood: user.currentMood
        }
    } catch (err) {
        next(err)
    }
}