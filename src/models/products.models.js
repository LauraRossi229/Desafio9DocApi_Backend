import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

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
    thumbnails: [],
    status: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

productSchema.plugin(mongoosePaginate);

export const productModel = model("products", productSchema);


