const path = require('path');
dashboard = (req,res) => { 
  res.sendFile(path.join(__dirname,"../views/dashboard.html"));
  
};

supplier = (req,res) => { 
  res.sendFile(path.join(__dirname,"../views/suppliers.html"));
};

inventory = (req,res) => { 
  res.sendFile(path.join(__dirname,"../views/inventory.html"));
};

module.exports = {dashboard,inventory,supplier};
