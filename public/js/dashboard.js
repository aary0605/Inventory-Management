const itemCount = document.getElementById('total-items');

const lowStock = document.getElementById('low-stock');

const supplierCount = document.getElementById('supplier-count');
const productCount = document.getElementById('product-count');
const amount = document.getElementById('bill-amount');
async function inventoryData() { 
   
   const res = await fetch('http://localhost:8000/api/dashboard');
   const data = await res.json();
   itemCount.textContent = data.total;
   lowStock.textContent = data.low;
   supplierCount.textContent = data.supplier;
   productCount.textContent = data.product;
   amount.textContent = data.bill;   
}
const tbody = document.getElementById('orders');

async function displayOrders() { 
  
  const response = await fetch('http://localhost:8000/api/orders');
  const data = await response.json();
  console.log(data);
  
  for(const order of data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <tr>
    <td> ${order.product}</td>
   
    <td> ${order.category}</td>
    <td> ${order.qty} </td>
    <td> ${order.created_date}</td>
    </tr>`;
    tbody.appendChild(tr);
  }
}
const itemsList = document.getElementById('list-of-items');

async function getLowStock() { 
  const response = await fetch('http://localhost:8000/api/lowStock');
  const data = await  response.json();
  const lowItems = document.getElementById('low-items');
  lowItems.textContent = `Items:${data.length}`;
  for(const order of data) { 
   
    const item = document.createElement('li');
    item.innerHTML = `
    <li class="list-item">
    <div class="item-info">
    <h5>${order.product}</h5>
    <span class="category">${order.category}</span>
    </div>
    
    <div class="stock-info">
    <span class="stock-left">${order.qty}</span>
    <span class="stock-text">Left</span>
    </div>
    </li>`
    itemsList.appendChild(item);
  }
}
inventoryData();
displayOrders();
getLowStock();
