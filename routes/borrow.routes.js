import express from "express";
import { moneyBorrow } from "../controllers/borrow.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();
//route for money borrow by user
router.post('/:id',protectRoute,moneyBorrow);
export default router;