import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
dotenv.config();


const app = express();
connectDb();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

export default app;
