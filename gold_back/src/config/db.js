import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: false,
      useUnifiedTopology: false,
    });
    console.log('MongoDb is Connected...!!!');
  } catch (error) {
    console.log('Error in connecting to MongoDB', error);
    process.exit(1);
  }
};
export default connectDb;
