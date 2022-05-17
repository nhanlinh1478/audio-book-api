const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const Book = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    slug: { type: String, slug: "name", default: null, unique: true },
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
    prices: {
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
