const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Book = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    author: {
      type: String,
      default: null,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isVip: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    channel: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", Book);
