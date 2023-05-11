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

const updateServicio = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre_servicio , descripcion_servicio, precio, id_categoria} = req.body;
        const {serviciosProps} = {nombre_servicio , descripcion_servicio, precio, id_categoria, 'estado_servicio': 'Pendiente', 'estado': true };
        const [result] = await getConnection.query("UPDATE servicios SET ? WHERE id = ?", [serviciosProps, id]);
        res.json(result);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

const estadoServicio = async (req,res) => {
    try {
        const {id} = req.params;
        const {estado_servicio} = req.body;
        const [result] = await getConnection.query("UPDATE servicios SET estado_servicio = ? WHERE id = ?",[estado_servicio,id]);
        res.json(result);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

const deleteServicio = async (req, res) => {

    try {
        const {id} = req.params;
        const estado = false;
        const [result] = await getConnection.query("UPDATE servicios SET estado = ? WHERE id = ?", [estado,id]);
        res.json(result);
    }
    catch(error){
        res.status(500).send(error.message);
    } 
}

export const methods = {
    getServicios,
    addServicios,
    listarCategorias,
    updateServicio,
    estadoServicio,
    deleteServicio
}