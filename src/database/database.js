
import {createPool} from "mysql2/promise";
import {
    DBPORT,
    HOST,
    DATABASE,
    USER,
    PASSWORD
} from "./../config.js";

export const getConnection = createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: DBPORT,
    database: DATABASE
});

