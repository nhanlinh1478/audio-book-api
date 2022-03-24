const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username:{
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    isVip: {
      type: Number,
      default: 0, // 0: false, 1: true
    },
    isAdmin: {
      type: Number,
      default: 0, // 0: false | 1: true
    },
    isLock: {
      type: Number,
      default: 0, // 0: false | 1: true
    },
    forgotPasswordCode: {
      type: String,
    },
    activationCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
