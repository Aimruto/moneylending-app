import express from "express";
import { signup,login } from "../controllers/auth.controllers.js";

// express router instance
const router = express.Router();

//route for user signUp
router.post("/signup",signup);

//route for user login
router.post("/login",login);

export default router;