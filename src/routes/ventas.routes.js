import { Router, request } from "express";
import { methods as ventasController } from "../controllers/fventas.controller.js";

const router = Router();

//mostrar listado de proveedor registrados
router.get("/", ventasController.listarVentasDisponibles);
router.get("/medicamentos", ventasController.listarVentasMedicamento);
router.get("/ventaTotal", ventasController.mostrarVentasTotales);

//insercion y modificacion del campo cantidad
router.post("/registrar", ventasController.addVenta);

//modificar proveedores
router.put("/modificar/:id", ventasController.updateVenta);

//eliminar producto
router.put("/eliminar/:id", ventasController.deleteVenta);
router.put("/eliminarventas", ventasController.deleteVentas);


//Estadisticas
router.get("/ventaMedicamento", ventasController.mostrarVentasPorMedicamento);
router.get("/ventaMedicamentoMasVendido", ventasController.mostrarMedicamentoMasVendido);
router.get("/ventasPromedioMes", ventasController.mostrarPromedioVentasPorMes);

export default router;