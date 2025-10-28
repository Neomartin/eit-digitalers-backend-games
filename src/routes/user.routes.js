import express from "express";
const router = express.Router();
import {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  loginUser,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

// Import controllers
router.get("/users", getUsers);
// Get user by ID
router.get("/users/:id", isAuth, getUserById);
// Create a new user
router.post("/users", createUser);
// Delete a user by ID
router.delete("/users/:id", isAuth, isAdmin, deleteUser);
// Update a user by ID
router.put("/users/:id", updateUser);
// Login user
router.post("/login", loginUser);
// Change user password
export default router;
