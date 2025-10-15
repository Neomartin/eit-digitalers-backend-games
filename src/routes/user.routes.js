import express from "express";
const router = express.Router();
import { getUsers }  from "../controllers/user.controller.js";

// Import controllers
router.get("/users", getUsers);
// Get user by ID
// Create a new user
// Delete a user by ID
// Update a user by ID
// Login user
// Change user password


export default router;
