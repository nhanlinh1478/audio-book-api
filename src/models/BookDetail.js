const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookDetail = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookDetail", BookDetail);
