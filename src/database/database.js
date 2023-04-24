import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createConnection({
    port: config.dbport,
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
};