
const pool = require('../config/db');


async function createTable() { 

    const table = await pool.query(`
        CREATE TABLE IF NOT EXISTS users 
        (
            id integer PRIMARY KEY AUTO_INCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
            )`);
            console.log("Table Created");
            
}

async function createProducts() { 

    const table = await pool.query(`
        CREATE TABLE IF NOT EXISTS products
        (
            id integer PRIMARY KEY AUTO_INCREMENT,
            product TEXT NOT NULL,
            category TEXT NOT NULL,
            price integer NOT NULL,
            qty integer NOT NULL,
            stock text NOT NULL,
            supplier TEXT NOT NULL
            )`);
            console.log("Table Created");
}
async function insertData(username,email,password) { 
    const data = await pool.query(`
        INSERT INTO users (username,email,password)
        VALUES(?,?,?)`,
        [username,email,password]
    );
    
}

async function checkEmail(email) {
    const data = await pool.query(`
        SELECT * FROM users WHERE email = ?;`,[email]);
    return data[0];
}


// insertData("Patel Aary","pate@.com","Aary0002");
// createTable();
module.exports = {insertData,checkEmail};
// Perfectly working;
