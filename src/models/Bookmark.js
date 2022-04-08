const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Bookmark = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    bookDetailId: {
      type: Schema.Types.ObjectId,
      ref: "BookDetail",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookmark", Bookmark);
