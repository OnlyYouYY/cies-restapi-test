import mysql from "promise-mysql";
import {
    DBPORT,
    HOST,
    DATABASE,
    USER,
    PASSWORD
} from "./../config.js";

const connection = mysql.createConnection({
    
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: DBPORT,
    database: DATABASE
});

export const getConnection = () => {
    return connection;
};
