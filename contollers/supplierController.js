const express = require('express');

const {addSupplier,supplierData,deleteSupplier,getSupplier,saveEdit} = require('../database/supplier');

  const supplier = async (req, res) => {
  try {
    await addSupplier(req.body);

    res.status(201).json({
      success: true,
      message: "Supplier added successfully."
    });
  } catch (err) {
    console.log("Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to add supplier."
    });
  }
};

const supplierHistory = async(req,res) => { 
     try {
    const data = await supplierData();
    res.status(200).json(data);
  } catch (err) {
    console.log("Error in history:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch supplier history."
    });
  }
};

async function fetchSupplier(req,res) {
  try {

    const id = req.query;
    const supplier = await getSupplier(id.id);
    res.status(200).json(supplier); 
  }
  catch(err) {
    console.log("Error:",err);
  }
}
async function editSupplier(req,res) {
  const body = req.body;
  const id = req.query;
  await saveEdit(body,id);

} 

async function supplierDelete(req,res) {
  const id = req.query; 
  await deleteSupplier(id);
  

}
module.exports = {supplier,supplierHistory,editSupplier,supplierDelete,fetchSupplier};