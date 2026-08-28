const editform = document.getElementById('edit-Form');
const formDiv = document.getElementById('product-form');
const form = document.getElementById('form');
const addButton = document.getElementById('add-product');
const cancelBtn = document.getElementById('cancel-btn');
const saveProduct = document.getElementById('save');
const body = document.getElementById('products-body');
const getCategory = document.getElementById('category-dropdowns');
const getPrice = document.getElementById('price-dropdowns');
const editForm = document.getElementById('edit-form');
const editCancel = document.getElementById('cancel-btn-1');

// * Get all products on load 
//! Default
window.addEventListener('load', async (e) => {
  productsHistory();
  console.log('Executed');
});

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  formDiv.style.display = "block";
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formDiv.style.display = "none";
});

editCancel.addEventListener('click',(e)=> {
   editForm.style.display = "none";
});





// TODO Event listener for the submit
document.getElementById('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // ✅ Get all input values
  const productName = document.getElementById('product-name').value.trim();
  const category = document.getElementById('category').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;
  const supplier = document.getElementById('supplier').value.trim();
  try {

    const res = await fetch('http://localhost:8000/inventory/product', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: productName, category: category, price: price, qty: quantity, supplier: supplier })
    });

    const data = await res.json();

    const toastMessage = document.getElementById('toast-message');
    const icon = document.getElementById('icon');
    const toastContainer = document.querySelector('.toast-container');
    toastMessage.textContent = data.message
    if (data.success == true) {
      icon.textContent = "✅";
      toastContainer.style.display = "block";
      toastContainer.classList.add('success');
      setTimeout(() => {
        toastContainer.style.display = "none";
        toastContainer.classList.remove('success');
        formDiv.style.display = "none";
      }, 4000);
      productsHistory();
    }
    else {
      icon.textContent = "❌";
      toastContainer.style.display = "block";
      toastContainer.classList.add('error');
      setTimeout(() => {
        toastContainer.style.display = "none";
        toastContainer.classList.remove('error');

      }, 4000);
    }
  }
  catch (err) {
    console.log(err);
  }
})



// TODO: Edit Form Event Listener for edit form;
editForm.addEventListener('submit',async(e) => {
  e.preventDefault();
  const productName = document.getElementById('edit-name').value.trim();
  const category = document.getElementById('edit-category').value;
  const quantity = document.getElementById('edit-quantity').value;
  const price = document.getElementById('edit-price').value;
  const supplierName = document.getElementById('edit-supplier').value.trim();

  const editedData = {
    product:productName,
    category:category,
    qty:quantity,
    price:price,
    supplier:supplierName
  }
  const res = await fetch('http://localhost:8000/')
  // const productName = document.getElementById('product-name').value.trim();
  // const category = document.getElementById('category').value;
  // const quantity = document.getElementById('quantity').value;
  // const price = document.getElementById('price').value;
  // const supplier = document.getElementById('supplier').value.trim();
   
})


// TODO: Event Listener for change in Category Selection
getCategory.addEventListener('change', async () => {
  const category = filterHistory(getCategory.value);
});

// TODO: Listen For change in Price Selection

getPrice.addEventListener('change', async (e) => {
  const price = filterByPrice(getPrice.value);

})


// * Return products by category
async function filterHistory(category) {
  try {
    body.innerHTML = "";
    if (category == undefined || category == "all") {
      productsHistory();
    }
    else {

      const res = await fetch(`http://localhost:8000/inventory/category?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      getRows(data);
    }
  }
  catch (err) {
    console.log(err.message);
  }
}

// * Return All products
async function productsHistory() {
  const res = await fetch('http://localhost:8000/inventory/history');
  const data = await res.json();
  getRows(data);
}

async function handleClick() {
  const parentI = document.getElementById('edit').closest('tr').getAttribute('id')
}
//* Create Rows
async function getRows(data) {
  let productCount = data.length;
  if (productCount == 0 || productCount == undefined) {
    const tr = document.createElement('tr');
    tr.setAttribute("id", tr.id)
    tr.innerHTML = `
    <td> NO Products Found. </td>`;
    body.append(tr);
  }
  else {
    body.innerHTML = '';
    for (const row of data) {
      const tr = document.createElement('tr');
      tr.setAttribute("id", row.id);

      count.innerHTML = `Showing ${productCount} Items`;
      tr.innerHTML = `
      <tr> 
      <td>${row.product}</td>
      <td> ${row.category}</td>
      <td> ${row.price}</td>
      <td> ${row.qty}</td>
      <td> ${row.supplier}</td>
      <td> ${row.supplier_id}</td>
      
      <button id="edit" onclick="editProduct(${row.id})"> Edit</button>
      <button id="delete" onclick="deleteProduct(${row.id})">Delete</button>
      
      </tr>`

      body.append(tr);
    }
  }
}


async function filterByPrice(option) {
  // ! HIGH = High to Low Price
  // ! LOW = Low To High
  console.log(option);
  if (option == undefined || option == "all") {
    body.innerHTML = "";
    productsHistory();
  }

  const res = await fetch(`http://localhost:8000/inventory/price?option=${encodeURIComponent(option)}`);

  const data = await res.json();

  body.innerHTML = "";
  getRows(data.data);

}

// * Delete Product function. executed on onclick

async function deleteProduct(id) {
  const res = await fetch(`/inventory/delete?id=${id}`, {
    method: "DELETE"
  });

  console.log("Deleted");
}

// TODO displays the edit data
async function editProduct(id){
  document.querySelector('.edit-form-container').style.display = "block";
  const res = await fetch(`http://localhost:8000/inventory/product/data?id=${id};`);
  const data = await res.json();
  
  const productName = document.getElementById('edit-name');
  const category = document.getElementById('edit-category');
  const quantity = document.getElementById('edit-quantity');
  const price = document.getElementById('edit-price');
  const supplierName = document.getElementById('edit-supplier');
  
  
  productName.value = data.Data[0].product;
  category.value = data.Data[0].category;
  quantity.value = data.Data[0].qty;
  price.value = data.Data[0].price;
  supplierName.value = data.Data[0].supplier;

}
// TODO : Fix Database.
// ! Create a edit form.

