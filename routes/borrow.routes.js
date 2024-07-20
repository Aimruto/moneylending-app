import express from "express";
import { moneyBorrow } from "../controllers/borrow.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();

router.post('/:id',protectRoute,moneyBorrow);
export default router;