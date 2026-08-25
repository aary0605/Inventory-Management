const express = require('express');

const {addSupplier,supplierData} = require('../database/supplier');

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
module.exports = {supplier,supplierHistory};