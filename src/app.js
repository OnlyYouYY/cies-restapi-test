import express from "express";
import morgan from "morgan";
import cors from "cors";
//Routes
import usuariosRoutes from "./routes/usuarios.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";

const app = express();


// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/servicios", serviciosRoutes);


export default app;