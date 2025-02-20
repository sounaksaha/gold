import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import priceRoutes from "./routes/priceRoutes.js"
import configurePassport from "./config/passportConfig.js";
dotenv.config();

const app = express();
connectDb();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
configurePassport(passport);
app.use("/api/admin", authRoutes);
app.use("/api/price", priceRoutes);

export default app;
