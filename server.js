import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"; 
import userRoutes from "./routes/user.routes.js";
import borrowRoutes from "./routes/borrow.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import cookieParser from "cookie-parser";
const app=express();
const PORT= process.env.PORT || 5000;

dotenv.config();
app.use(cookieParser())
app.use(express.json()); //parse incoming requests with json payloads(from req.body)
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/borrow",borrowRoutes);


app.listen(PORT, ()=>{
    connectToMongoDb();
    console.log(`server running on port ${PORT}`);
});