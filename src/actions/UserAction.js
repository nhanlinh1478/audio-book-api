const User = require("../models/User");
const bcrypt = require("bcrypt");
const { userDTO, usersDTO } = require("../dto/user.dto");

module.exports = class UserAction {
  async profile(userId, code) {
    const user = await User.findById(userId);
    if (!user) {
      return {
        code,
        success: false,
        message: "User not found.",
      };
    }

    return JSON.stringify({
      code,
      success: true,
      message: "Get user profile successfully.",
      data: userDTO(user),
    });
  }
  async password(userId, oldPassword, password, code) {
    const user = await User.findById(userId);
    if (!user) {
      return {
        code,
        success: false,
        message: "User not found.",
      };
    }

    const compare = await bcrypt.compare(oldPassword, user.password);
    if (compare == false) {
      return JSON.stringify({
        code,
        success: false,
        message: "Old password is incorrect.",
      });
    }
    user.password = bcrypt.hashSync(password, 10);
    await user.save();
    return JSON.stringify({
      code,
      success: true,
      message: "Change password successfully.",
    });
  }
  async findAll(code) {
    const users = await User.find();
    return JSON.stringify({
      code,
      success: true,
      message: "Get all users successfully.",
      data: usersDTO(users),
    });
  }
  async findOne(userId, code) {
    const user = await User.findById(userId);
    if (!user) {
      return JSON.stringify({
        code,
        success: false,
        message: "User not found.",
      });
    }

    return JSON.stringify({
      code,
      success: true,
      message: "Get user successfully.",
      data: userDTO(user),
    });
  }
  async create(body, code) {
    const user = await User.findOne({ email: body.email });
    if (user) {
      return JSON.stringify({
        code,
        success: false,
        message: "Email is already used.",
      });
    }

    const newUser = new User(body);
    newUser.password = bcrypt.hashSync(body.password, 10);
    await newUser.save();
    return JSON.stringify({
      code,
      success: true,
      message: "Create user successfully.",
      data: userDTO(newUser),
    });
  }
  async update(userId, body, code) {
    const user = await User.findById(userId);
    if (!user) {
      return JSON.stringify({
        code,
        success: false,
        message: "User not found.",
      });
    }

    user.username = body.username;
    user.isVip = body.isVip;
    if (user.email != "admin@admin.com") {
      user.isAdmin = body.isAdmin;
      user.isLock = body.isLock;
    }

    await user.save();
    return JSON.stringify({
      code,
      success: true,
      message: "Update user successfully.",
      data: userDTO(user),
    });
  }
  async delete(userId, code) {
    const user = await User.findById(userId);
    if (!user) {
      return JSON.stringify({
        code,
        success: false,
        message: "User not found.",
      });
    }

    await user.remove();
    return JSON.stringify({
      code,
      success: true,
      message: "Delete user successfully.",
    });
  }
};
