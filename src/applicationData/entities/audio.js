const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Audio = new Schema(
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

module.exports = mongoose.model("Audio", Audio);
