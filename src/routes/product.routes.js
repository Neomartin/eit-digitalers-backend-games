import express from "express";
import { getProducts, getProductById } from "../controllers/product.controller.js";


const router = express.Router();
// Obtener todos los productos
router.get("/products", getProducts);
// Obtener un producto específico por ID
router.get("/products/:id", getProductById)
// Crear un nuevo producto
// Borrar un producto por ID
// Actualizar un producto por ID

export default router;

