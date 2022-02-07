const { User } = require("../models/index");
const { compareHashWithPlain } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const currentMood = "undefined";

      const { email, password, username } = req.body;

      const result = await User.create({
        email,
        password,
        username,
        currentMood,
      });

      res.status(201).json({ id: result.id, email: result.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const login = await User.findOne({ where: { email } });

      if (!email) {
        throw { name: "EmailEmpty" }
      }

      if (!password) {
        throw { name: "PasswordEmpty" }
      }

      if (!login) {
        throw { name: "Unauthorized" }
      }

      if (!compareHashWithPlain(password, login.password)) {
        throw { name: "Unauthorized" };
      }
      
      const payload = {
        id: login.id,
        email: login.email,
      };

      const token = createToken(payload);
      res.status(200).json({
        access_token: token,
        email: login.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
