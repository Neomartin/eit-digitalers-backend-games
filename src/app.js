import express from "express";
const app = express();
import routes from "./routes/index.js";

// Middleware para parsear el body de las peticiones como JSON
app.use( express.json() )

app.use("/api", routes);



export default app;
