const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Category = new Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
