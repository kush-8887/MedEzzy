/*
    Connection to db made using pool
    DO NOT TOUCH THIS CODE!
*/

const mySql = require('mysql2/promise');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "Kush@2023",
    database: "testingdb",
};

const pool = mySql.createPool(dbConfig);

async function performSqlQuery(query) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.execute(query);
        return { rows, fields };
    } catch (error) {
        console.error('Error performing SQL query:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = {
    performSqlQuery
};
