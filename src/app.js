import express from "express";
const app = express();
import routes from "./routes/index.js";
import cors from "cors";

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Configuramos los CORS
app.use(cors());

// Compartir la carpeta "public" como estática para servir imágenes y otros archivos
app.use(express.static("public"));

app.use("/api", routes);

export default app;
