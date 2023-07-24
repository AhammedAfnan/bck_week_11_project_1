const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    mainImg: {
      type: String,
      required: true,
    },
    images: {
      type: [{ url: { String } }],
    },
    isListed: {
      type: Boolean,
      default: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: 'Category',
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
