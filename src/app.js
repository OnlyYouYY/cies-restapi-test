import express from "express";
import morgan from "morgan";
//Routes
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();


// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/usuarios", usuariosRoutes);


export default app;