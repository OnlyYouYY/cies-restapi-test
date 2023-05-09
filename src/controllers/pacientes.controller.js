import { getConnection } from "./../database/database.js";


const getPaciente = async (request, response) => {
    try {
        const { nombre,id } = request.params;
        const [result] = await getConnection.query("SELECT * FROM usuarios WHERE nombre = ? AND id = ?",[nombre,id]);
        console.log(result);
        response.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getPaciente
}