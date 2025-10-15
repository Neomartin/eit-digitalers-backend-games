import express from "express";
import { getProducts, getProductById, createProduct, deleteProduct } from "../controllers/product.controller.js";


const router = express.Router();
// Obtener todos los productos
router.get("/products", getProducts);
// Obtener un producto específico por ID
router.get("/products/:id", getProductById)

// Crear un nuevo producto
router.post("/products", createProduct);


// Borrar un producto por ID
router.delete("/products/:id", deleteProduct);
// Actualizar un producto por ID

export default router;

