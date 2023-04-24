import mysql from "promise-mysql";
import config from "./../config.js";

const connection = mysql.createConnection({
    port: config.dbport,
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

export const getConnection = () => {
    return connection;
};
