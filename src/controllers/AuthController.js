const User = require("../models/User");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const authenticate = require("../authenticate");

class AuthController {
  // [POST] /auth/login
  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (
      user &&
      (await bcrypt.compare(req.body.password, user ? user.password : ""))
    ) {
      console.log(user.activationCode);
      if (user.isLock == 1)
        return res.json({
          status: res.statusCode,
          success: false,
          message:
            "Your account has been disabled. Please contact the administrator.",
        });
      if (
        user.activationCode != "" &&
        user.activationCode !== undefined &&
        user.activationCode !== null
      )
        return res.json({
          status: res.statusCode,
          success: false,
          message:
            "Your account has not been activated. Please double-check your email.",
        });
      const jwt = authenticate.getToken(user);
      user.password = undefined;
      res.json({
        code: res.statusCode,
        success: true,
        message: "",
        data: {
          user,
          jwt,
        },
      });
    } else {
      res.json({
        code: res.statusCode,
        success: false,
        message: "Incorrect email or password",
      });
    }
  }

  // [POST] /auth/register
  async register(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (validator.validate(email) === false)
      return res.json({
        code: res.statusCode,
        success: false,
        message: "Email address is invalid",
      });
    if (!password)
      return res.json({
        code: res.statusCode,
        success: false,
        message: "Empty password",
      });

    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        code: res.statusCode,
        success: false,
        message: "The email already exists!",
      });
    }

    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    await newUser.save();
    return res.json({
      code: res.statusCode,
      success: true,
      message: "Successful account registration.",
    });
  }
}

module.exports = new AuthController();
