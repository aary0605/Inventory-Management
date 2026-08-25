const pool = require('../config/db');

async function getUser(username,password) {
  const user = await  pool.query(`
    SELECT * FROM users WHERE username = ?;`,[username]);
  return user[0];
}

module.exports = getUser;