import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const adminSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
  adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };


export const Admin = mongoose.model("Admin", adminSchema);
