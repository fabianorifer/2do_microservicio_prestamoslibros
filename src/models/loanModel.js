const { Pool } = require('pg');

const pool = new Pool({
    user: 'root',
    host: '44.212.238.5',  // Dirección de la MV de la base de datos
    database: 'prestamos_db',
    password: 'utec',
    port: 8005,
});

module.exports = pool;
