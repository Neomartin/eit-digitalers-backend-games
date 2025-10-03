import express from "express";
const router = express.Router();
import { getUsers }  from "../controllers/user.controller.js";

// Import controllers
router.get("/users", getUsers);


export default router;
