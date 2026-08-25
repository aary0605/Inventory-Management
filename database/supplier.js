const pool = require('../config/db');

async function supplierData() { 
  const res =await  pool.query(`
    select supplier.*,count(products.product) as total_products from supplier 
    left join products on supplier.supplier_id = products.supplier_id 
    group by supplier.supplie_name,supplier.supplier_id;`);
    
    return res[0];
    
}


async function addSupplier(...data){ 
  try {

    const res = pool.query(`
      insert into supplier(supplier_id,supplie_name,
    supplier_city,
    supplier_contact,
    supplier_email) 
    values(?,?,?,?,?);`,[data[0].id,data[0].supplier,data[0].city,data[0].phone,data[0].email]);
   console.log("Data Added"); 
  }
  catch(err) {
    console.log(err);
  }
}
// addSupplier({id:1004,supplier:"Abc",city:"Ahemdabad",phone:3444,email:"dffe"});


module.exports = {addSupplier,supplierData};