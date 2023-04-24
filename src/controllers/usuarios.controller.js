import { getConnection } from "./../database/database";

//Busqueda
const getUsuarios = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios WHERE idUsuario = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//Insercion
const addUsuarios = async (req, res) => {
    try {
        const { nombres, apellidos, usuario, contrasenia } = req.body;

        if(nombres === undefined || apellidos === undefined || usuario === undefined || contrasenia === undefined){
            res.status(400).json({message: "Porfavor llena todos los campos"});
        }

        const usuariosProps = { nombres, apellidos, usuario, contrasenia }
        const connection = await getConnection();
        await connection.query("INSERT INTO usuarios SET ?", usuariosProps);
        res.json({message: "Usuario registrado"});
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//Actualizacion
const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, apellidos, usuario, contrasenia } = req.body;

        if(id === undefined || nombres === undefined || apellidos === undefined || usuario === undefined || contrasenia === undefined){
            res.status(400).json({message: "Porfavor llena todos los campos"});
        }

        const usuariosProps = { nombres, apellidos, usuario, contrasenia }

        const connection = await getConnection();
        const result = await connection.query("UPDATE usuarios SET ? WHERE idUsuario = ?", [usuariosProps,id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


//Eliminacion
const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE idUsuario = ? ", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getUsuarios,
    getUsuario,
    addUsuarios,
    deleteUsuario,
    updateUsuario
}