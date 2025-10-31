import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import uploadImage from "../middlewares/uploadImage.js";

// Obtener todos los productos  - ❌ no requiere autenticación (token)
const router = express.Router();
router.get("/products", getProducts);
// Obtener un producto específico por ID - ❌ no requiere autenticación (token)
router.get("/products/:id", getProductById);

// Crear un nuevo producto - ✅ requiere autenticación (token) y rol de admin
router.post("/products", isAuth, isAdmin, uploadImage, createProduct);

// Borrar un producto por ID - ✅ requiere autenticación (token) y rol de admin
router.delete("/products/:id", isAuth, isAdmin, deleteProduct);

// Actualizar un producto por ID - ✅ requiere autenticación (token) y rol de admin
router.put("/products/:idUpdate", isAuth, isAdmin, updateProduct);

export default router;
