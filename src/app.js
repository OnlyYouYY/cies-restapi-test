import express from "express";
import morgan from "morgan";
//Routes
import usuariosRoutes from "./routes/usuarios.routes";
import {PORT} from "./config";

const app = express();

// Settings
app.set("port",PORT);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/usuarios", usuariosRoutes);

app.use((req,res, next) => {
    res.status(404).json({
        message: "El endpoint no funciona"
    });
});

export default app;