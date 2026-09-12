// const editform = document.getElementById('edit-Form');
// const formDiv = document.getElementById('product-form');
// const form = document.getElementById('form');
// const addButton = document.getElementById('add-product');
// const cancelBtn = document.getElementById('cancel-btn');
// const saveProduct = document.getElementById('save');
// const body = document.getElementById('products-body');
// const getCategory = document.getElementById('category-dropdowns');
// const getPrice = document.getElementById('price-dropdowns');
// const editForm = document.getElementById('edit-form');
// const editCancel = document.getElementById('cancel-btn-1');

// // * Get all products on load 
// //! Default
// window.addEventListener('load', async (e) => {
//   productsHistory();
//   console.log('Executed');
// });

// addButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   formDiv.style.display = "block";
// });

// cancelBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   formDiv.style.display = "none";
// });

// editCancel.addEventListener('click',(e)=> {
//    editForm.style.display = "none";
// });





// // TODO Event listener for the submit
// form.addEventListener('submit', async function (e) {
//   e.preventDefault();

//   // ✅ Get all input values
//   const productName = document.getElementById('product-name').value.trim();
//   const category = document.getElementById('category').value;
//   const quantity = document.getElementById('quantity').value;
//   const price = document.getElementById('price').value;
//   const supplier = document.getElementById('supplier').value.trim();
//   try {

//     const res = await fetch('/inventory/product', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ product: productName, category:category, price: price, qty: quantity, supplier: supplier })
//     });

//     const data = await res.json();

//     const toastMessage = document.getElementById('toast-message');
//     const icon = document.getElementById('icon');
//     const toastContainer = document.querySelector('.toast-container');
//     toastMessage.textContent = data.message
//     if (data.success == true) {
//       icon.textContent = "✅";
//       toastContainer.style.display = "block";
//       toastContainer.classList.add('success');
//       setTimeout(() => {
//         toastContainer.style.display = "none";
//         toastContainer.classList.remove('success');
//         formDiv.style.display = "none";
//       }, 4000);
//       productsHistory();
//     }
//     else {
//       icon.textContent = "❌";
//       toastContainer.style.display = "block";
//       toastContainer.classList.add('error');
//       setTimeout(() => {
//         toastContainer.style.display = "none";
//         toastContainer.classList.remove('error');

//       }, 4000);
//     }
//   }
//   catch (err) {
//     console.log(err);
//   }
// })



// // TODO: Edit Form Event Listener for edit form;
// editForm.addEventListener('submit',async(e) => {
//   e.preventDefault();
//   const productName = document.getElementById('edit-name').value.trim();
//   const category = document.getElementById('edit-category').value;
//   const quantity = document.getElementById('edit-quantity').value;
//   const price = document.getElementById('edit-price').value;
//   const supplierName = document.getElementById('edit-supplier').value.trim();
//   const productId = document.getElementById('product-id').value;
//   const editedData = {
//     product:productName,
//     category:category,
//     qty:quantity,
//     price:price,
//     supplier:supplierName,
//     id:productId
//   }
 
//   const res = await fetch('/inventory/edit',{
//     method:'PATCH',
//     headers:{"Content-Type":"application/json"},
//     body:JSON.stringify(editedData) 
//   })
  
// })


// // TODO: Event Listener for change in Category Selection
// getCategory.addEventListener('change', async () => {
//   const category = filterHistory(getCategory.value);
//   console.log(getCategory.value);
// });

// // TODO: Listen For change in Price Selection

// getPrice.addEventListener('change', async (e) => {
//   const price = filterByPrice(getPrice.value);

// })


// // * Return products by category
// async function filterHistory(category) {
//   try {
//     body.innerHTML = "";
//     if (category == undefined || category == "all") {
//       productsHistory();
//     }
//     else {

//       const res = await fetch(`/inventory/category?category=${encodeURIComponent(category)}`);
//       const data = await res.json();
//       getRows(data);
//     }
//   }
//   catch (err) {
//     console.log(err.message);
//   }
// }

// // * Return All products
// async function productsHistory() {
//   const res = await fetch('/inventory/history');
//   const data = await res.json();
//   getRows(data);
// }

// async function handleClick() {
//   const parentI = document.getElementById('edit').closest('tr').getAttribute('id')
// }
// //* Create Rows
// async function getRows(data) {
//   let productCount = data.length;
//   if (productCount == 0 || productCount == undefined) {
//     const tr = document.createElement('tr');
//     tr.setAttribute("id", tr.id)
//     tr.innerHTML = `
//     <td> NO Products Found. </td>`;
//     body.append(tr);
//   }
//   else {
//     body.innerHTML = '';
//     for (const row of data) {
//       const tr = document.createElement('tr');
//       tr.setAttribute("id", row.id);

//       count.textContent = ` Showing ${productCount} Items`;
    
//       tr.innerHTML = `
//     <tr> 
//       <td>${row.product}</td>
//       <td>${row.category}</td>
//       <td>${row.price}</td>
//       <td>${row.qty}</td>
//       <td>${row.supplier}</td>
      
//       <td class="flex gap-3 p-2">
//        <button id="edit" class="border-2 bg-blue-600 text-white" onclick="editProduct(${row.id})"> Edit</button>
//        <button id="delete" class="border-2  text-black" onclick="deleteProduct(${row.id})"> Delete </button>
//        </td> 
//     </tr>`
//       body.append(tr);
//     }
//   }
// }


// async function filterByPrice(option) {
//   // ! HIGH = High to Low Price
//   // ! LOW = Low To High
//   console.log(option);
//   if (option == undefined || option == "all") {
//     body.innerHTML = "";
//     productsHistory();
//   }

//   const res = await fetch(`/inventory/price?option=${encodeURIComponent(option)}`);

//   const data = await res.json();

//   body.innerHTML = "";
//   getRows(data.data);

// }

// // * Delete Product function. executed on onclick

// async function deleteProduct(id) {
//   const res = await fetch(`/inventory/delete?id=${id}`, {
//     method: "DELETE"
//   });

//   console.log("Deleted");
// }

// // TODO displays the edit data
// async function editProduct(id){
//   document.querySelector('.edit-form-container').style.display = "block";
//   const res = await fetch(`/inventory/product/data?id=${id};`);
//   const data = await res.json();
  
//   const productName = document.getElementById('edit-name');
//   const category = document.getElementById('edit-category');
//   const quantity = document.getElementById('edit-quantity');
//   const price = document.getElementById('edit-price');
//   const supplierName = document.getElementById('edit-supplier');
//   const productId  = document.getElementById('product-id');
  
  
//   productName.value = data.Data[0].product;
//   category.value = data.Data[0].category;
//   quantity.value = data.Data[0].qty;
//   price.value = data.Data[0].price;
//   supplierName.value = data.Data[0].supplier;
//   productId.value = id;

// }
// TODO : Fix Database.
// ! Create a edit form.



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

const IMGBB_API_KEY = 'e826ec1f2cd1b9bb0e21cce7dba1f30d'; // 🔑 Replace with your key from imgbb.com

// * Get all products on load
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

editCancel.addEventListener('click', (e) => {
  editForm.style.display = "none";
});


// Add this inside getRows, where you build tr.innerHTML
const stockBadge = row.qty <= 5 
  ? `<span style="
        background:#ef4444; 
        color:white; 
        font-size:10px; 
        font-weight:bold;
        padding:2px 7px; 
        border-radius:999px; 
        margin-left:6px;
        vertical-align:middle;
     ">⚠️ Low Stock</span>` 
  : '';

tr.innerHTML = `
  <td>${imageCell}</td>
  <td>${row.product} ${stockBadge}</td>   
  <td>${row.category}</td>
  <td>${row.price}</td>
  <td>${row.qty}</td>
  <td>${row.supplier}</td>
  <td class="flex gap-3 p-2">
    <button id="edit" class="border-2 bg-blue-600 text-white" onclick="editProduct(${row.id})">Edit</button>
    <button id="delete" class="border-2 text-black" onclick="deleteProduct(${row.id})">Delete</button>
  </td>`;


// Count low stock items and show alert
const lowStockCount = data.filter(row => row.qty <= 5).length;
const alertBanner = document.getElementById('low-stock-banner');

if (alertBanner) {
  if (lowStockCount > 0) {
    alertBanner.textContent = `⚠️ ${lowStockCount} item${lowStockCount > 1 ? 's are' : ' is'} low on stock!`;
    alertBanner.style.display = 'block';
  } else {
    alertBanner.style.display = 'none';
  }
}  

// ✅ IMAGE UPLOAD HELPER — uploads to ImgBB and returns URL
async function uploadImageToImgBB(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(',')[1];
      const formData = new FormData();
      formData.append('image', base64Data);

      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          resolve(data.data.url);
        } else {
          resolve(null); // fail gracefully, no image
        }
      } catch (err) {
        resolve(null);
      }
    };
    reader.onerror = () => resolve(null);
  });
}


// ✅ IMAGE PREVIEW FUNCTION — called from HTML oninput
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const preview = document.getElementById('img-preview');
  const previewContainer = document.getElementById('img-preview-container');
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    previewContainer.style.display = 'block';
  };
  reader.readAsDataURL(file);
}


// TODO: Form submit — uploads image first, then sends data
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const productName = document.getElementById('product-name').value.trim();
  const category = document.getElementById('category').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;
  const supplier = document.getElementById('supplier').value.trim();
  const imageFile = document.getElementById('product-image')?.files[0];

  const uploadStatus = document.getElementById('upload-status');

  // Upload image if one was selected
  let image_url = null;
  if (imageFile) {
    if (uploadStatus) {
      uploadStatus.textContent = '⏳ Uploading image...';
      uploadStatus.style.color = '#f39c12';
    }
    image_url = await uploadImageToImgBB(imageFile);
    if (uploadStatus) {
      uploadStatus.textContent = image_url ? '✅ Image uploaded!' : '⚠️ Image upload failed, saving without image.';
      uploadStatus.style.color = image_url ? '#27ae60' : '#e74c3c';
    }
  }

  try {
    const res = await fetch('/inventory/product', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: productName,
        category: category,
        price: price,
        qty: quantity,
        supplier: supplier,
        image_url: image_url  // ✅ send image URL to backend
      })
    });

    const data = await res.json();

    const toastMessage = document.getElementById('toast-message');
    const icon = document.getElementById('icon');
    const toastContainer = document.querySelector('.toast-container');
    toastMessage.textContent = data.message;

    if (data.success == true) {
      icon.textContent = "✅";
      toastContainer.style.display = "block";
      toastContainer.classList.add('success');

      // Reset image preview
      if (document.getElementById('img-preview-container')) {
        document.getElementById('img-preview-container').style.display = 'none';
      }
      if (uploadStatus) uploadStatus.textContent = '';
      form.reset();

      setTimeout(() => {
        toastContainer.style.display = "none";
        toastContainer.classList.remove('success');
        formDiv.style.display = "none";
      }, 4000);
      productsHistory();
    } else {
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
});


// TODO: Edit Form submit
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const productName = document.getElementById('edit-name').value.trim();
  const category = document.getElementById('edit-category').value;
  const quantity = document.getElementById('edit-quantity').value;
  const price = document.getElementById('edit-price').value;
  const supplierName = document.getElementById('edit-supplier').value.trim();
  const productId = document.getElementById('product-id').value;

  const editedData = {
    product: productName,
    category: category,
    qty: quantity,
    price: price,
    supplier: supplierName,
    id: productId
  };

  const res = await fetch('/inventory/edit', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedData)
  });
});


// TODO: Category filter
getCategory.addEventListener('change', async () => {
  filterHistory(getCategory.value);
});

// TODO: Price filter
getPrice.addEventListener('change', async (e) => {
  filterByPrice(getPrice.value);
});


// * Filter by category
async function filterHistory(category) {
  try {
    body.innerHTML = "";
    if (category == undefined || category == "all") {
      productsHistory();
    } else {
      const res = await fetch(`/inventory/category?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      getRows(data);
    }
  }
  catch (err) {
    console.log(err.message);
  }
}

// * Get all products
async function productsHistory() {
  const res = await fetch('/inventory/history');
  const data = await res.json();
  getRows(data);
}

// ✅ UPDATED getRows — now shows product image thumbnail
async function getRows(data) {
  let productCount = data.length;
  body.innerHTML = '';

  if (productCount == 0 || productCount == undefined) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="7">No Products Found.</td>`;
    body.append(tr);
  } else {
    for (const row of data) {
      const tr = document.createElement('tr');
      tr.setAttribute("id", row.id);

      count.textContent = `Showing ${productCount} Items`;

      // Image cell — show thumbnail or placeholder
      const imageCell = row.image_url
        ? `<img 
              src="${row.image_url}" 
              alt="${row.product}"
              onclick="openImageModal('${row.image_url}', '${row.product}')"
              style="width:48px; height:48px; object-fit:cover; border-radius:6px; cursor:pointer; border:1px solid #ddd;"
              title="Click to enlarge"
           />`
        : `<span style="color:#bbb; font-size:12px;">—</span>`;

      tr.innerHTML = `
        <td>${imageCell}</td>
        <td>${row.product}</td>
        <td>${row.category}</td>
        <td>${row.price}</td>
        <td>${row.qty}</td>
        <td>${row.supplier}</td>
        <td class="flex gap-3 p-2">
          <button id="edit" class="border-2 bg-blue-600 text-white" onclick="editProduct(${row.id})">Edit</button>
          <button id="delete" class="border-2 text-black" onclick="deleteProduct(${row.id})">Delete</button>
        </td>`;
      body.append(tr);
    }
  }
}

// ✅ IMAGE MODAL — click thumbnail to see full image
function openImageModal(url, name) {
  let modal = document.getElementById('image-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.cssText = `
      display:none; position:fixed; top:0; left:0; width:100%; height:100%;
      background:rgba(0,0,0,0.85); z-index:9999;
      justify-content:center; align-items:center; flex-direction:column;
    `;
    modal.innerHTML = `
      <img id="modal-img" src="" style="max-width:90vw; max-height:80vh; border-radius:10px;" />
      <p id="modal-name" style="color:white; margin-top:12px; font-size:18px; font-weight:bold;"></p>
      <p style="color:#aaa; font-size:13px; margin-top:4px;">Click anywhere to close</p>
    `;
    modal.addEventListener('click', () => modal.style.display = 'none');
    document.body.appendChild(modal);
  }
  document.getElementById('modal-img').src = url;
  document.getElementById('modal-name').textContent = name;
  modal.style.display = 'flex';
}


// * Filter by price
async function filterByPrice(option) {
  if (option == undefined || option == "all") {
    body.innerHTML = "";
    productsHistory();
    return;
  }
  const res = await fetch(`/inventory/price?option=${encodeURIComponent(option)}`);
  const data = await res.json();
  body.innerHTML = "";
  getRows(data.data);
}

// * Delete product
async function deleteProduct(id) {
  const res = await fetch(`/inventory/delete?id=${id}`, { method: "DELETE" });
  productsHistory(); // refresh after delete
  console.log("Deleted");
}

// * Edit product — populate edit form
async function editProduct(id) {
  document.querySelector('.edit-form-container').style.display = "block";
  const res = await fetch(`/inventory/product/data?id=${id};`);
  const data = await res.json();

  document.getElementById('edit-name').value = data.Data[0].product;
  document.getElementById('edit-category').value = data.Data[0].category;
  document.getElementById('edit-quantity').value = data.Data[0].qty;
  document.getElementById('edit-price').value = data.Data[0].price;
  document.getElementById('edit-supplier').value = data.Data[0].supplier;
  document.getElementById('product-id').value = id;
}
