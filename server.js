import express from "express";
import dotenv from "dotenv"; // for environment variable management

//import route handlers
import authRoutes from "./routes/auth.routes.js"; 
import userRoutes from "./routes/user.routes.js";
import borrowRoutes from "./routes/borrow.routes.js";

//import mongoDB connection utility
import connectToMongoDb from "./db/connectToMongoDb.js";

//cookie-parser middleware for handling cookies
import cookieParser from "cookie-parser";

//initialize express application
const app=express();

//set the port from environment variables or default to 5000 
const PORT= process.env.PORT || 5000;

//load environment variables from .env file
dotenv.config();

//middleware to parse cookies
app.use(cookieParser())
app.use(express.json()); //parse incoming requests with json payloads(from req.body)

//authentication routes
app.use("/api/auth",authRoutes);

//user management rouutes
app.use("/api/user",userRoutes);

//borrowing routes
app.use("/api/borrow",borrowRoutes);

//starts the server and connects to mongoDb
app.listen(PORT, ()=>{
    connectToMongoDb();
    console.log(`server running on port ${PORT}`);
});