import { getConnection } from "./../database/database.js";
import { uploadImageToStorage } from "../service/googleCloud.js";


const getServicios = async (req, res) => {
    try {
        const estado = true;
        const [result] = await getConnection.query("SELECT s.*, c.nombre_categoria FROM servicios s INNER JOIN categoria_servicios c ON s.id_categoria = c.id WHERE s.estado = ? ORDER BY s.fecha_creacion DESC;", estado);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const listarCategorias = async (req, res) => {
    try {
        const estado = true;
        const [result] = await getConnection.query("SELECT id,nombre_categoria FROM categoria_servicios WHERE estado = ?", estado);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const addServicio = async (req, res) => {
    try {
        const { nombre_servicio, descripcion_servicio, precio, id_categoria } = req.body;

        const imageUrl = await uploadImageToStorage(req.file);

        const serviciosProps = { nombre_servicio, descripcion_servicio, precio, id_categoria,ruta_imagen:imageUrl, 'estado_servicio': 'Pendiente', 'estado': true };
        const [result] = await getConnection.query("INSERT INTO servicios SET ?", serviciosProps);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const addServicios = async (req, res) => {
    try {
        const servicios = req.body;

        if (!servicios || !Array.isArray(servicios) || servicios.length === 0) {
            return res.status(400).json({ error: "Servicios inválidos" });
        }

        const serviciosValues = servicios.map(servicio => {
            return [servicio.nombre_servicio, servicio.descripcion_servicio, servicio.precio, servicio.id_categoria, 'Pendiente', true];
        });

        const sql = "INSERT INTO servicios (nombre_servicio, descripcion_servicio, precio, id_categoria, estado_servicio, estado) VALUES ?";
        const [result] = await getConnection.query(sql, [serviciosValues]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_servicio, descripcion_servicio, precio, id_categoria } = req.body;
        const serviciosProps = { nombre_servicio, descripcion_servicio, precio, id_categoria };
        const [result] = await getConnection.query("UPDATE servicios SET ? WHERE id = ?", [serviciosProps, id]);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const estadoServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado_servicio } = req.body;
        const [result] = await getConnection.query("UPDATE servicios SET estado_servicio = ? WHERE id = ?", [estado_servicio, id]);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteServicio = async (req, res) => {

    try {
        const { id } = req.params;
        const estado = false;
        const [result] = await getConnection.query("UPDATE servicios SET estado = ? WHERE id = ?", [estado, id]);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteServicios = async (req, res) => {
    try {
        const { ids } = req.body;
        const estado = false;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "IDs inválidos" });
        }
        const sql = "UPDATE servicios SET estado = ? WHERE id IN (?)";
        const [result] = await getConnection.query(sql, [estado, ids]);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const methods = {
    getServicios,
    addServicio,
    addServicios,
    listarCategorias,
    updateServicio,
    estadoServicio,
    deleteServicio,
    deleteServicios
}