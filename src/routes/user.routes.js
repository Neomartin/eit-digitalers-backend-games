import express from "express";
const router = express.Router();
import { getUsers, createUser, deleteUser, getUserById, updateUser }  from "../controllers/user.controller.js";

// Import controllers
router.get("/users", getUsers);
// Get user by ID
router.get("/users/:id", getUserById);
// Create a new user
router.post("/users", createUser);
// Delete a user by ID
router.delete("/users/:id", deleteUser);
// Update a user by ID
router.put("/users/:id", updateUser);
// Login user
// Change user password
export default router;
