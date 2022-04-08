const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    facebookId: {
      type: String,
      default: null,
    },
    isVip: {
      type: Date,
      default: Date.now(),
    },
    isAdmin: {
      type: Number,
      default: 0, // 0: false | 1: true | -1: Super Admin
    },
    isLock: {
      type: Number,
      default: 0, // 0: false | 1: true
    },
    forgotPasswordCode: {
      type: String,
      default: null,
    },
    activationCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
