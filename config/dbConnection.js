import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
dotenv.config()

const DB_NAME = process.env.DB_NAME // name for the project database
const DB_USER_NAME = process.env.DB_USER_NAME || 'root' // defrault for my sql
const DB_PASSWORD = process.env.DB_PASSWORD || '12345678' // password for mysql login
const DB_HOST_NAME = process.env.DB_HOST_NAME || 'localhost' // hostname as choice
const DB_PORT = process.env.DB_PORT || '3306' // default port for mysql

const dialectGroup = {
    '3306': 'mysql',        // MySQL & MariaDB both runs same PORT
    '5432': 'postgres',     // PostgreSQL
    '1433': 'mssql',        // Microsoft SQL Server
    '1521': 'oracle',       // Oracle
    '50000': 'db2',         // IBM DB2
};

const dialect = dialectGroup[DB_PORT] || 'mysql' // if not given by default set mysql
console.log(`Dialect chooose :${dialect}`)


async function dbConnection() {
    try {

        // create connection using mysql to check/create the db
        const connection = await mysql.createConnection({
            host: DB_HOST_NAME,
            user: DB_USER_NAME,
            password: DB_PASSWORD,
            port: DB_PORT
        })

        // create database if not exit
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`)
        console.log(`✅ Database '${DB_NAME}' checked/created successfully.`);
        await connection.end() // close the connection
        // conncet to mysql
        const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
            host: DB_HOST_NAME,
            dialect: dialect,
            port: DB_PORT,
            pool: {
                max: 5, // 5 databases connection at same time
                min: 0, // when no connection it shrink to 0
                accquire: 30000, //new conncetion after 30 sec
                idle: 10000 // 10 sec to sit idle
            }
        })
        console.log(`✅ Sequelize connected to '${DB_NAME}' database.`);
        return sequelize;
    } catch (error) {
        console.error("❌ Database connection failed:", error)
        process.exit(1); // Exit the process if connection fails
    }
}

export const sequelize = await dbConnection()

/* Test the db connection
async function db() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}
db()
*/
