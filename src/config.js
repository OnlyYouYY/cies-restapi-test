import {config} from "dotenv";

config();

export const PORT = process.env.PORT || 4000;

export default {
    port: process.env.dbport || 3306,
    host: process.env.host || "",
    database: process.env.database || "",
    user: process.env.user || "",
    password: process.env.password || ""
};