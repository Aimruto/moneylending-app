import express from "express";
import { signup,login } from "../controllers/auth.controllers.js";
const router = express.Router();


//if its a get function
router.post("/signup",signup)
router.post("/login",login);


export default router;