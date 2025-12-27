import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/mongoose.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// DB Connection
connectDB();

export default app;
