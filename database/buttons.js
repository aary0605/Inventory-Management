const pool = require('../config/db');


async function deleteProduct(id) { 
  try {

    const setForeignKey = await pool.query(`
      SET FOREIGN_KEY_CHECKS = 0 ;`);
      
    const query = await pool.query(`
        delete from products
        where id = ${id.id};`);
    
    console.log('Deleted');
  }
  catch(err) {
    console.log("Error in button:",err);
  }
  finally {
    const setKey = await pool.query(`
      SET FOREIGN_KEY_CHECKS = 1;`);
  }
    // console.log("Item Deleted")
}

async function editProducts(data) {
  try {

    const query = await pool.query(`
      update products 
      set product = '${data.product}',qty= ${data.qty},category = '${data.category}',price =${data.price},supplier = '${data.supplier}' 
      where id = ${data.id};`)
      console.log('Data Updated');
   } 
   catch(err){
    console.log(err)
   }
  }
module.exports = {deleteProduct,editProducts};
