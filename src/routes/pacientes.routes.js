import {Router, request} from "express";
import {methods as pacientesController} from "./../controllers/pacientes.controller.js";

const router = Router();

//Busqueda paciente
router.get("/pacientes/:id", pacientesController.getPaciente);


export default router;