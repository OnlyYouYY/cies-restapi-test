import express from "express";
import morgan from "morgan";
//Routes
import usuariosRoutes from "./routes/usuarios.routes";
import {PORT} from "./config"

const app = express();

// Settings
app.set("port",PORT);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/usuarios", usuariosRoutes);

export default app;