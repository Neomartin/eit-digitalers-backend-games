import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

app.get("/", (req, res) => {

  res.send("Hola mundo desde Express");

})

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

