const pool = require('../config/db');

async function supplierData() { 
 const query = await pool.query(`
  select * from supplier;`);
  return query[0];
}



async function setSupplierId() {
   const data = await supplierData(); 
   
   const id = data.length + 1 + 1000;
   return id;
}

setSupplierId();
async function addSupplier(...data){ 
  try {

    const res = pool.query(`
      insert into supplier(supplier_id,supplie_name,
    supplier_city,
    supplier_contact,
    supplier_email) 
    values(?,?,?,?,?);`,[await setSupplierId(),data[0].supplier,data[0].city,data[0].phone,data[0].email]);
   console.log("Data Added"); 
  }
  catch(err) {
    console.log(err);
  }
}
// addSupplier({id:1004,supplier:"Abc",city:"Ahemdabad",phone:3444,email:"dffe"});

async function deleteSupplier(id) {
  const res = await pool.query(`
    delete from supplier
    where supplier_id = ${id.id};`);
    console.log(`${id.id} Deleted`);
}

async function getSupplier(id){ 
  const data = await pool.query(`
    select * from supplier 
    where supplier_id = ${id};`);
    return data[0];

}
async function saveEdit(data,id) {
  try {

    const query = await pool.query(`
      update supplier 
      set supplie_name = '${data.name}',supplier_contact = ${data.phone},supplier_email = '${data.email}',supplier_city = '${data.city}'
      where supplier_id = ${id.id};`);      
  }
  catch(err){
    console.log(err);
  }
}

async function getSearchSupplier(name) {
  const query = await pool.query(`
    select * from supplier 
    where supplie_name = '${name}';`
  );
  return query[0];
}

module.exports = {addSupplier,supplierData,deleteSupplier,getSupplier,saveEdit,getSearchSupplier};