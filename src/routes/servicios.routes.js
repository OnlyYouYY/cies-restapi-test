import {Router, request} from "express";
import {methods as serviciosController} from "./../controllers/servicios.controller.js";

const router = Router();

//Listar
router.get("/", serviciosController.getServicios);
router.get("/categorias", serviciosController.listarCategorias);

//Insercion
router.post("/registrar", serviciosController.addServicios);


export default router;