const pool = require('../config/db');

async function supplierData() { 
 const query = await pool.query(`
  select * from supplier;`);
  return query[0];
}


async function addSupplier(...data){ 
  try {

    const res = pool.query(`
      insert into supplier(supplie_name,
    supplier_city,
    supplier_contact,
    supplier_email) 
    values(?,?,?,?,?);`,[data[0].supplier,data[0].city,data[0].phone,data[0].email]);
   console.log("Data Added"); 
  }
  catch(err) {
    console.log(err);
  }
}
// addSupplier({id:1004,supplier:"Abc",city:"Ahemdabad",phone:3444,email:"dffe"});


module.exports = {addSupplier,supplierData};