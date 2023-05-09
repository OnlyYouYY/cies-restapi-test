import { getConnection } from "./../database/database.js";


const getServicios = async () => {
    try {
        const [result] = await getConnection.query("SELECT * FROM servicios");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const listarCategorias = async () => {
    try {
        const [result] = await getConnection.query("SELECT * FROM categoria_servicios");
        res.json(result);
    } catch (error){
        res.status(500).send(error.message);
    }
}

const addServicios = async (req, res) => {
    try {
        const { nombre_servicio, descripcion_servicio, precio, id_categoria } = req.body;

        const serviciosProps = { nombre_servicio, descripcion_servicio, precio, id_categoria, 'estado_servicio': 'Pendiente', 'estado': true };
        const [result] = await getConnection.query("INSERT INTO servicios SET ?", serviciosProps);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getServicios,
    addServicios,
    listarCategorias
}