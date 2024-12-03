require('dotenv').config();

const { Pool } = require('pg');

async function connectDB() {
    try {
        const config = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        };

        const pool = new Pool({
            ...config,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 3000,
        })

        pool.on('connect', (client) => {})

        return pool;
    } catch (error) {
        console.error('Erro na conexão com o banco de dados:', error.message);
        throw error;
    }
}
module.exports = connectDB;