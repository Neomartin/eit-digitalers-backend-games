import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;



// Conectar a la base de datos
mongoose.connect(MONGO_URI)
            .then(() => {
              console.log("Conectado a la base de datos");
              // Iniciar el servidor
              app.listen(PORT, () => {
                console.log(`Servidor escuchando en puerto ${PORT}`);
              })
            })
            .catch((error) => {
              console.error("Error al conectar a la base de datos:", error);
            });

