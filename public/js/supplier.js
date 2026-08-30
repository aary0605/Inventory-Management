const addSupplier = document.getElementById('add-supplier-btn');

const cancelBtn = document.getElementById('cancel-btn');

const formContainer= document.querySelector('.form-container');

const form = document.getElementById('supplier-form');

const saveBtn = document.getElementById('save');

addSupplier.addEventListener('click',(e)=> {
  formContainer.style.display = "block";
})
cancelBtn.addEventListener('click',()=> {
  formContainer.style.display = "none";
})
getOrderHistory();
form.addEventListener('submit',async (e)=> {
  e.preventDefault();
  const supplierName = document.getElementById('supplier-name').value.trim();
  const supplierPhone = document.getElementById('supplier-tel').value;
  const supplierEmail = document.getElementById('supplier-email').value;
  const supplierCity = document.getElementById('supplier-city').value;
  
  try {
    const res = await fetch('http://localhost:8000/supplier/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        supplier: supplierName,
        city: supplierCity,
        phone: supplierPhone,
        email: supplierEmail
      })
    });

    const data = await res.json();

    if (data.success) {
      alert(data.message);
     
      // Close form after 3 seconds
      setTimeout(() => {
        formContainer.style.display = "none";
        form.reset();
        getOrderHistory()
      }, 3000);

    } else {
      alert(data.message);

    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
})
async function getOrderHistory() { 
  const res = await fetch('http://localhost:8000/supplier/history');
  const data = await res.json();
  
  const body = document.getElementById('supplier-table');
  for(const row of data) { 
   
    const tr = document.createElement('tr');
    tr.innerHTML =
    `
    <tr> 
    <td> ${row.supplie_name} </td>
    <td> ${row.supplier_city} </td>
    <td> ${row.supplier_contact} </td>
    <td> ${row.supplier_email} </td>
    <td> 
    <button onclick = handleEdit(${row.supplier_id})> Edit </button>
    <button onclick = handleDelete(${row.supplier_id})>Delete </button> 
    </td>
    </tr>
    `
    body.append(tr);
   } 
}

async function handleDelete(id) {
  const res = await fetch(`http://localhost:8000/supplier/delete?id=${id}`, {
    method: "DELETE"
  });
  console.log("Deleted");
  
}

async function handleEdit(id){
  document.querySelector('.edit-form-container').style.display = "block";
  const res = await fetch(`http://localhost:8000/supplier/data/?id=${id};`);
  const data = await res.json();
}
