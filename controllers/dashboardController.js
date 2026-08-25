const path = require('path');

const {getDashboardData,getOrders,updateLowStock} = require('../database/products');
const { json } = require('stream/consumers');


// Checks on the dashboardDisplay 
//  1. check is dashboardDisplay is undefined or not
//  2. 
validation = async (req,res) => {
   try {
      const database = await getDashboardData();
      const {total,low,supplier,product,bill} = database;
      if(!database) { 
          // throw new Error("Data not fetched");
        return res.status(500).send({
          message:"Data is not Provided"
        })
      }
      else if(total == undefined || low == undefined || supplier == undefined) {
        // throw new Error("Data not Provided. Check Products Db");
        return res.status(500).send({
          message:"Data field is empty"
        })
      }
      else if(typeof total !== "number" ||typeof low !== "number" ||typeof supplier !== "number"){
        // throw new Error("Invalid DataType");
        return res.status(500).send({
          message:"Data not a number"
        })
      }
      else if(total < 0 || low < 0 || supplier < 0)
      {
        //  throw new Error("Data Cant be Negative");
        return res.status(500).send({
          message:"Data cannot be negative"
        })
      }
      else{ 
        res.status(200).json(database);
      }
    } 
    catch(e) {
      console.error(e);
    } 
}
orderHistory = async(req,res) => { 

  const orders = await getOrders();
  
  if(!orders) { 
    return res.status(500).json({
      message:"Error: Cannot Fetch the data",
    })
  }
  for(const order of orders) {

   if(!order.product  || !order.category || !order.qty || !order.created_date) { 
    return  res.status(500).json({
      message:"Error: Missing Value"
    })
   }
   else if(typeof order.product != 'string' || typeof order.category != 'string'|| typeof order.qty != 'number') {
    return res.status(500).json({
      message:"Error: Wrong Datatype"
    })
   }
   else if(order.qty < 0) { 
    return res.status(500).json({
      message:"Error:Value Cannot Be Negative"
    })
   }
   }
  return res.status(200).json(orders);
}
getStock = async(req,res) => {
  const lowStock = await updateLowStock();
  if(!lowStock) { 
    return res.status(500).json({
      message:"Error:No Data Available"
    })
  }
  for(const item of lowStock){
    if(!item.product || !item.category || !item.qty){
      return res.status(500).json({
        message:"Error: Missing Value"
      })
    }
    else if(!item.qty < 0) { 
      return res.status(500).json({
        message:"Error:Qty Cannot be Negative"
      })
    }
  }
  return res.status(200).json(lowStock);
}

module.exports = {validation,orderHistory,getStock};