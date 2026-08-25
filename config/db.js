const mysql = require('mysql2/promise');

const pool =   mysql.createPool( {
    host:"localhost",
    user:"root",
    password:"Aary001.",
    database:"inventory"
});

module.exports = pool;
