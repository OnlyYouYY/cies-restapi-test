import { getConnection } from "./../database/database.js";

//mostrar un listado de ventas
const listarReabastecimientoDisponibles = async (req, res) => {
    try {
        const estado = true;
        const [result] = await getConnection.query("SELECT r.*, DATE_FORMAT(r.fecha_reabastecimiento, '%d-%m-%Y') AS fecha_reabastecimiento , p.nombre_proveedor FROM inventario_reabastecimiento r INNER JOIN inventario_proveedores p ON r.id_proveedor = p.id_proveedor WHERE r.estado = ?", estado);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//liscar todos los proveedores que estan activos
const listarReabastecimientoProveeores = async (req, res) => {
    try {
        const estado = true;
        const [result] = await getConnection.query("SELECT * FROM inventario_proveedores WHERE estado = ?", estado);
        res.json(result);
    } catch (error){
        res.status(500).send(error.message);
    }
}

//insertar nuevo registro de ventas 
const addReabastecimiento = async (req, res) => {
    try {
        const { pedido_producto,id_proveedor, cantidad_reabastecida, fecha_reabastecimiento , costo_total } = req.body;

        const reabastecimientoProps = { pedido_producto,id_proveedor, cantidad_reabastecida, fecha_reabastecimiento ,costo_total, 'estado_reabastecimiento': 'Pendiente', 'estado': true };
        const [result] = await getConnection.query("INSERT INTO inventario_reabastecimiento SET ?", reabastecimientoProps);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

//editar las ventas que estan mal registradas
const updateReabastecimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { pedido_producto ,id_proveedor, cantidad_reabastecida, fecha_reabastecimiento , costo_total} = req.body;
        const reabastecimientoProps = { pedido_producto, id_proveedor, cantidad_reabastecida, fecha_reabastecimiento , costo_total}
        const [result] = await getConnection.query("UPDATE inventario_reabastecimiento SET ? WHERE id_reabastecimiento = ?", [reabastecimientoProps, id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const estadoReabastecimiento = async (req,res) => {
    try {
        const {id} = req.params;
        const {estado_servicio} = req.body;
        const [result] = await getConnection.query("UPDATE inventario_reabastecimiento SET estado_reabastecimiento = ? WHERE id_reabastecimiento = ?",[estado_servicio,id]);
        res.json(result);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

//Eliminar(cambiar el estado) de los proveedores que yo no son necesarios
const deleteReabastecimiento = async (req, res) => {
    try {
        const estado = false;
        const { id } = req.params;
        const [result] = await getConnection.query("UPDATE inventario_reabastecimiento SET estado = ? WHERE id_reabastecimiento = ?",[estado , id]);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteReabastecimientos = async (req, res) => {
    try {
        const { ids } = req.body;
        const estado = false;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "IDs inválidos" });
        }
        const sql = "UPDATE inventario_reabastecimiento SET estado = ? WHERE id_reabastecimiento IN (?)";
        const [result] = await getConnection.query(sql, [estado, ids]);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    listarReabastecimientoDisponibles,
    listarReabastecimientoProveeores,
    addReabastecimiento,
    updateReabastecimiento,
    estadoReabastecimiento,
    deleteReabastecimiento,
    deleteReabastecimientos
}
