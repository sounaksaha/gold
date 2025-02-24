import mongoose, { Schema } from "mongoose";

const priceSchema = new Schema({
  productType: { type: String, enum: ["gold", "silver"], required: true },
  date: { type: Date, required: true },
  time:{type:Date,required:true},
  price:{type:String,required:true},
  createdAt: { type: Date, default: Date.now() },
});



export const Price = mongoose.model("Price", priceSchema);
