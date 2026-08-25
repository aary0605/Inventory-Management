const pool = require('../config/db');


async function getAllCategory(){
  const res = await pool.query(`
    select * from products;`);
    return res[0];
}

async function filterCategory(category) {
  const res = await pool.query(` 
    Select * from products 
    where category = ?`,[category]);
  return res[0];
}

async function priceDESC() { 
  const res = await pool.query(`
   Select * from products 
   order by price DESC`);
   return res[0];
}
async function priceASC() {
  const res = await  pool.query(`
    Select * from products 
    order by price;`);
   return res[0];
}
module.exports = {getAllCategory,filterCategory,priceDESC,priceASC};