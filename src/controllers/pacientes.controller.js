import { getConnection } from "./../database/database.js";


const getPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await getConnection.query("SELECT * FROM usuarios WHERE nombre = ? AND id = ?",id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getPaciente
}