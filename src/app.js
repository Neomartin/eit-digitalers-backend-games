import express from "express";
const app = express();
import routes from "./routes/index.js";
// import productRoutes from "./routes/product.routes.js";
// import userRoutes from "./routes/user.routes.js";

// Uso de rutas
// app.use("/api", productRoutes); 
// app.use("/api", userRoutes);

app.use("/api", routes);



export default app;
