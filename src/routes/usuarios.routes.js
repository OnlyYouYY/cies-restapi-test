import { Router, request } from "express";
import { methods as usuariosController } from "./../controllers/usuarios.controller.js";

const router = Router();
//Busquedas

router.get("/", usuariosController.getUsuarios);
router.get("/medicos", usuariosController.getMedicos);
router.get("/medicoID/:id_usuario", usuariosController.getMedicoID);
router.get("/horariosID/:id_medico", usuariosController.getHorariosMedicoID);
router.get("/usuario/:id", usuariosController.getUsuario);


//Inserciones
router.post("/registrar", usuariosController.addUsuarios);
router.post("/registrarMedico", usuariosController.addMedico);
router.post("/registrarHorarioMedico", usuariosController.addHorarioMedico);

//Eliminacion
router.put("/delete/:id", usuariosController.deleteUsuario);

//Actualizaciones
router.put("/actualizar/:id", usuariosController.updateUsuario);

//Login
router.post("/login", usuariosController.loginUser);


export default router;