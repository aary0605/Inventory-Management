const express = require('express');
const path = require('path');

const app = express();

const authRoutes = require("./routes/authRoutes");

const pageRoutes = require('./routes/pageroutes');
const apiroutes = require('./routes/apiroutes');

const inventoryRoutes =require('./routes/inventoryRoutes');

const supplierRoutes = require('./routes/supplierRoutes');
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.use("/",authRoutes);
app.use('/',apiroutes);
app.use('/',inventoryRoutes);
app.use('/',pageRoutes);
app.use('/',supplierRoutes);

app.listen(8000,()=> {
  console.log('Server Started')
});