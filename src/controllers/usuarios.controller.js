import { getConnection } from "./../database/database.js";
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, 'secretKey', { expiresIn: '1h' });
    return token;
}

//Busqueda
const getUsuarios = async (req, res) => {
    try {
        const [result] = await getConnection.query("SELECT * FROM usuarios");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await getConnection.query("SELECT * FROM usuarios WHERE id = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
//Login

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const estado = true;
        const [result] = await getConnection.query("SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ? AND estado = ?", [username, password, estado]);
        if (result.length > 0) {
            const token = generateToken(result[0].id);
            res.status(200).json({ token, result });
        } else {
            res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



//Insercion
const addUsuarios = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasenia, rol } = req.body;

        if (nombre === undefined || apellido === undefined || correo === undefined || contrasenia === undefined || rol === undefined) {
            res.status(400).json({ message: "Porfavor llena todos los campos" });
        }

        const usuariosProps = { nombre, apellido, correo, contrasenia, rol, 'estado': true }
        const [result] = await getConnection.query("INSERT INTO usuarios SET ?", usuariosProps);
        res.json(result);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

//Actualizacion
const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, contrasenia, rol } = req.body;

        if (id === undefined || nombre === undefined || apellido === undefined || correo === undefined || contrasenia === undefined || rol === undefined) {
            res.status(400).json({ message: "Porfavor llena todos los campos" });
        }

        const usuariosProps = { nombre, apellido, correo, contrasenia, rol, 'estado': true }

        const [result] = await getConnection.query("UPDATE usuarios SET ? WHERE id = ?", [usuariosProps, id]);
        
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


//Eliminacion
const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = false;
        const [result] = await getConnection.query("UPDATE usuarios SET estado = ? WHERE id = ? ", [estado, id]);
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
    updateUsuario,
    loginUser
}