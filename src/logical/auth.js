const User = require("../models/User");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const authenticate = require("../authenticate");

module.exports = class Auth {
  async CreateSuperAdmin(email, password, code) {
    const user = await User.findOne({ email });
    if (user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The email already exists!",
      });
    }
    const newUser = new User({
      email,
      password,
      isAdmin: -1,
      activationCode: "",
      forgotPasswordCode: "",
    });
    await newUser.save();
    return JSON.stringify({
      code,
      success: true,
      message: "Super admin has been created.",
    });
  }

  async SignIn(email, password, code) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user ? user.password : ""))) {
      if (user.isLock == 1)
        return JSON.stringify({
          code,
          success: false,
          message:
            "Your account has been disabled. Please contact the administrator.",
        });
      if (
        user.activationCode != "" &&
        user.activationCode !== undefined &&
        user.activationCode !== null
      )
        return JSON.stringify({
          code,
          success: false,
          message:
            "Your account has not been activated. Please double-check your email.",
        });
      const jwt = authenticate.getToken(user);
      user.password = undefined;
      return JSON.stringify({
        code,
        success: true,
        message: "",
        data: {
          user,
          jwt,
        },
      });
    } else {
      return JSON.stringify({
        code,
        success: false,
        message: "Incorrect email or password",
      });
    }
  }

  async SignUp(email, password, code) {
    if (validator.validate(email) === false)
      return JSON.stringify({
        code,
        success: false,
        message: "Email address is invalid",
      });
    if (!password)
      return JSON.stringify({
        code,
        success: false,
        message: "Empty password",
      });

    const user = await User.findOne({ email });
    if (user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The email already exists!",
      });
    }

    const newUser = new User({ email });
    newUser.password = bcrypt.hashSync(password, 10);
    newUser.activationCode = Math.random().toString(36).slice(2);
    await newUser.save();
    // send email
    return JSON.stringify({
      code,
      success: true,
      message:
        "Successful account registration. An email has been sent to your email address. Please check.",
    });
  }

  async Login(email, password, code) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user ? user.password : ""))) {
      if (user.isLock == 1)
        return JSON.stringify({
          code,
          success: false,
          message:
            "Your account has been disabled. Please contact the administrator.",
        });
      if (
        user.activationCode != "" &&
        user.activationCode !== undefined &&
        user.activationCode !== null
      )
        return JSON.stringify({
          code,
          success: false,
          message:
            "Your account has not been activated. Please double-check your email.",
        });
      if (user.isAdmin == 0) {
        return JSON.stringify({
          code,
          success: false,
          message:
            "You are not authorized to access this resource. Please contact the administrator.",
        });
      }
      const jwt = authenticate.getToken(user);
      user.password = undefined;
      return JSON.stringify({
        code,
        success: true,
        message: "",
        data: {
          user,
          jwt,
        },
      });
    } else {
      return JSON.stringify({
        code,
        success: false,
        message: "Incorrect email or password",
      });
    }
  }

  async ForgotPassword(email, code) {
    const user = await User.findOne({ email });
    if (!user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The email does not exist.",
      });
    }
    if (user.isLock == 1) {
      return JSON.stringify({
        code,
        success: false,
        message:
          "Your account has been disabled. Please contact the administrator.",
      });
    }

    user.forgotPasswordCode = Math.random().toString(36).slice(2);
    await user.save();
    // send email
    return JSON.stringify({
      code,
      success: true,
      message: "An email has been sent to your email address. Please check.",
    });
  }

  async CheckForgotPasswordCode(forgotPasswordCode, code) {
    const user = await User.findOne({ forgotPasswordCode });
    if (!forgotPasswordCode || !user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The code is invalid.",
      });
    }
    if (user.isLock == 1) {
      return JSON.stringify({
        code,
        success: false,
        message:
          "Your account has been disabled. Please contact the administrator.",
      });
    }
    return JSON.stringify({
      code,
      success: true,
      message: "OK",
      email: user.email,
    });
  }

  async ResetPassword(forgotPasswordCode, password, code) {
    const user = await User.findOne({ forgotPasswordCode });
    if (!user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The code is invalid.",
      });
    }
    if (user.isLock == 1) {
      return JSON.stringify({
        code,
        success: false,
        message:
          "Your account has been disabled. Please contact the administrator.",
      });
    }
    user.password = bcrypt.hashSync(password, 10);
    user.forgotPasswordCode = "";
    await user.save();
    return JSON.stringify({
      code,
      success: true,
      message: "Password has been reset.",
    });
  }

  async ReActivationAccount(email, code) {
    const user = await User.findOne({ email });
    if (!user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The email does not exist.",
      });
    }
    if (user.isLock == 1) {
      return JSON.stringify({
        code,
        success: false,
        message:
          "Your account has been disabled. Please contact the administrator.",
      });
    }
    if (user.activationCode == "") {
      return JSON.stringify({
        code,
        success: false,
        message: "Your account has been activated.",
      });
    }

    user.activationCode = Math.random().toString(36).slice(2);
    await user.save();
    // send email
    return JSON.stringify({
      code,
      success: true,
      message: "An email has been sent to your email address. Please check.",
    });
  }

  async CheckActivationCode(activationCode, code) {
    const user = await User.findOne({ activationCode });
    if (!activationCode || !user) {
      return JSON.stringify({
        code,
        success: false,
        message: "The code is invalid.",
      });
    }
    if (user.isLock == 1) {
      return JSON.stringify({
        code,
        success: false,
        message:
          "Your account has been disabled. Please contact the administrator.",
      });
    }
    user.activationCode = "";
    await user.save();
    return JSON.stringify({
      code,
      success: true,
      message: "OK",
      email: user.email,
    });
  }
};
