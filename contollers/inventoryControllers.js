const express = require('express');

const {addProduct,getById} = require('../database/products');
const {getAllCategory,filterCategory,priceDESC,priceASC} = require('../database/components');
const deleteProduct = require('../database/buttons');
const 
dataHandling = async(req,res) => {
  try{
   console.log("Req:",req.body)
    const {product,category,price,qty,supplier} = req.body;
    // Make db calls 
   
     const result = await addProduct(product,category,price,qty,supplier);
     console.log('Added');
  
    res.status(200).json({
         message:"Data Added Successfully",
         success:true
    })
    
  }
  catch(err) {
    
     res.status(500).json({
      message:`${err}`
     })
   }
  
}
const productsHistory = async(req,res) => { 
  try {
    const data=  await getAllCategory();
    res.status(200).json(data)
  }
  catch(err) {
    res.status(500).json({
      message:err,
      status:false
    })

  }
}

const filterByCategory = async(req,res) => { 
  try {
    const category = req.query;
    const data = await filterCategory(category.category);
   
    // Return the data from here
    return res.status(200).json(data);
  }
  catch {
     return res.status(500).json({
      message:"Error",
      success:false
     });
  }
}

const filterByPrice = async(req,res) => {
  try {
    const selectedOption  = req.query.option;
    
    if(selectedOption == 'high')
    {
      const data = await priceDESC(); 
      
      res.status(200).json({
        message:"high to low",
        data:data
      });
    }
    else {

      const data  = await priceASC();
      
      res.staus(200).json({
        message:"low to high",
        data:data
      });
    }
  }
  catch{

  }
}

async function deleteProducts(req,res) {
  try {

    const getId = req.query;
    const id = getId;
    await deleteProduct(getId);
    res.status(200).json({
      message:`Item Deleted`
    });
  }
  catch(err) {
    console.log("Error",err);
  }

}
async function productId(req,res) {
  try {
    const id = req.query;
    const data = await getById(id.id);
    res.status(200).json({
      message:"Got",
      Data:data
    });

  }
  catch(err) {

  }
}

async function editProduct(req,res) {
  try {
    const data = req.body;
    
  }
  catch {

  }

}
module.exports = {dataHandling,productsHistory,filterByCategory,filterByPrice,deleteProducts,productId,editProduct};