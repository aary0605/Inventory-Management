const pool = require('../config/db');



async function editProduct(id) { 
  const res = await pool.query(`
    select * from products where id = ${id};`)
    return res[0];
}



// async function setSupplierId(supplier_name) {
//   try {
//     // const res = await pool.query(`
//     //   UPDATE products 
//     //   JOIN supplier on supplier.supplie_name = products.supplier
//     //   SET products.supplier_id = supplier.supplier_id
//     //   WHERE products.supplier = ?;`,[supplier_name]);
//       const res = await pool.query(`
//         select supplier_id 
//         from supplier
//         where supplie_name = ?;`,
//         [supplier_name]
//       );
//       return res[0];
//   }
//   catch(err) { 
//     console.log(err.sqlMessage);
//   }
// }


async function addProduct(product,category,price,qty,supplier)
{ 
  try{ 
    // const supplierId = await setSupplierId(supplier);
    
    if(supplierId.length == 0) {
      throw new Error('Error: Supplier not registered.');
    }
    
    const res = await pool.query(`
      INSERT INTO products (product,category,price,qty,supplier,created)
      VALUES(?,?,?,?,?,CURDATE())`,[product,category,price,qty,supplier]); 
      console.log("Data entered");
    }
    catch(err){
      console.log("Error:",err.message);
      throw err;
      
     
    }
}

// addProduct("Ice Cream","dairy",400,5,"amul");
// addProduct("Tomato","Vegetables",150,1,"in","xyz");
// addProduct("paneer","dairy",100,3,"in","britannia");


async function getDashboardData() { 
  const totalItems = await pool.query(`
    SELECT COUNT(*) as total FROM products;`);
  
  const lowCount = await pool.query(`
   SELECT count(product) as low from products where qty < 5;`);
   
  
  const supplierCount = await pool.query(`
    SELECT COUNT(DISTINCT supplier) as suppliers from products;`);
  const productCount = await pool.query(`
    SELECT COUNT(product) as pcount FROM products;`);
  
  const bill = await pool.query(`
    SELECT SUM(price) as bill FROM products;`);
  
    return{
      total:totalItems[0][0].total,
      low : lowCount[0][0].low,
      supplier: supplierCount[0][0].suppliers,
      product : productCount[0][0].pcount,
      bill:bill[0][0].bill};
  }
  
async function getOrders(){
  const data = await pool.query(`
    SELECT
    product,category,qty,
    DATE_FORMAT(created, '%Y-%m-%d') AS created_date
FROM products order by created desc;`
);
     return data[0];
}


async function updateLowStock(){
  const data = await pool.query(`
    SELECT product,category,qty 
    FROM products 
    where qty < 5 order by qty;`);
    return data[0]; 
}

async function getById(id) { 
  const  query = await pool.query(`
    select * from products 
    where id = ${id};`);
    return query[0];
}

module.exports = {addProduct,getDashboardData,getOrders,updateLowStock,getById};
