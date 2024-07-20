import express from "express";
import { UserData } from "../controllers/user.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/:id',protectRoute,UserData);

export default router;