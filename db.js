import mysql from 'mysql2';
import env from 'dotenv';

env.config();

// connect to the database
export const databaseConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
});