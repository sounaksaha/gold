import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const priceSchema = new Schema({
  productType: { type: String, enum: ["gold", "silver"], required: true },
  date: { type: Date, required: true },
  time:{type:Date,required:true},
  price:{type:String,required:true},
  createdAt: { type: Date, default: Date.now() },
});

// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     // this.password = await bcrypt.hash(this.password, salt);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
// adminSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

export const Price = mongoose.model("Price", priceSchema);
