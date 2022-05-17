const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Bookmark = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      default: null,
    },
    audioId: {
      type: Schema.Types.ObjectId,
      ref: "Audio",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookmark", Bookmark);
