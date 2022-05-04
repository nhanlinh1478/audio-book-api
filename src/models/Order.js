const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
    status: {
      type: Number,
      default: -1, // -1: Đã hủy, 0: Đang xử lý, 1: Đã hoàn thành
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
