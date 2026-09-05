const mysql = require('mysql2/promise');
require("dotenv").config();
// const pool =   mysql.createPool( {
//     host:"localhost",
//     user:"root",
//     password:"Aary001.",
//     database:"inventory"
// });

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

(async () => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");
    console.log("✅ Connected to database:", rows);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

module.exports = pool;
