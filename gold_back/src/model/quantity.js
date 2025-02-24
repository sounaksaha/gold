import mongoose, { Schema } from "mongoose";

const quantitySchema = new Schema({
  productType: { type: String, enum: ["gold", "silver"], required: true },
  quantity: { type: Number },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export const Quantity = mongoose.model("Quantity", quantitySchema);
