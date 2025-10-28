import express from "express";
import { isAuth } from "../middlewares/isAuth";

const router = express.Router();

// Aquí van las rutas relacionadas con las órdenes
// Crear una nueva orden
router.post("/orders", isAuth, (req, res) => res.send("Crear una nueva orden"));

export default router;
