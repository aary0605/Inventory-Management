const addSupplier = document.getElementById('add-supplier-btn');

const cancelBtn = document.getElementById('cancel-btn');

const formContainer= document.querySelector('.form-container');

const body = document.getElementById('supplier-table');

const form = document.getElementById('supplier-form');

const saveBtn = document.getElementById('save');

const editForm = document.querySelector('.edit-form-container');
const editCancel = document.getElementById('cancel-btn-1');

const sortSelection = document.getElementById('sort');

addSupplier.addEventListener('click',(e)=> {
  formContainer.style.display = "block";
})
cancelBtn.addEventListener('click',()=> {
  formContainer.style.display = "none";
})


editCancel.addEventListener('click',(e)=> {
   editForm.style.display = "none";
});

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


// * Edit form

editForm.addEventListener('submit',async(e) => {
  e.preventDefault();
  const supplierName = document.getElementById('edit-name');
  const supplierPhone = document.getElementById('edit-phone');
  const supplierEmail = document.getElementById('edit-email');
  const supplierCity = document.getElementById('edit-city');
  const hiddenId  = document.getElementById('supplier-id').value;
  
  const editedData = {
    name:supplierName.value,
    phone:supplierPhone.value,
    email: supplierEmail.value,
    city:supplierCity.value
  };
  
  const data = await fetch(`http://localhost:8000/supplier/data?id=${hiddenId}`,{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(editedData)
  })
  const res = await data.json();
  if(res) {
    setTimeout(() => {
      editForm.style.display = "none";
    },3000);
  }
})

sortSelection.addEventListener('change',async(e) => {
  const option = sortSelection.value || undefined;
  if(option == undefined || option == "" || option == "all") {
    body.innerHTML = "";
    await getOrderHistory();
  }
  else if(option == "Asc") {
   const res = await fetch(`http://localhost:8000/supplier/sort?option=${option}`);
   const data = await res.json();
   getRows(data);
     
  }
  else if(option == "Dsc"){ 
   const res = await fetch(`http://localhost:8000/supplier/sort?option=${option}`);
   const data = await res.json();
    getRows(data);

  }
})



async function getRows(data) {
  body.innerHTML = "";

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
    <button class=" border-2 text-black" onclick = handleEdit(${row.supplier_id})> Edit </button>
    <button onclick = handleDelete(${row.supplier_id})>Delete </button> 
    </td>
    </tr>
    `
    body.append(tr);
   } 

}

async function getOrderHistory() { 
 
  const res = await fetch('http://localhost:8000/supplier/history');
  const data = await res.json();
  if (!data || data.length === 0) {
    body.innerHTML ="";
    body.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-6 text-gray-400 text-lg">
           No suppliers Found.
        </td>
      </tr>
    `;
    return;
  }
  getRows(data)
}

async function displaySearch(data) {
  const body = document.getElementById('supplier-table');
  body.innerHTML = '';
  
  if(!data || data.length == 0) {
    body.innerHTML = `
    <tr> 
    <td colSpan="5" class = "bg-gray-400 text-black text-center py-6 text-lg"> No Supplier Available. </td> 
    </tr>`;
    return;
  }
 
  
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
    <button onclick = handleEdit(${row.supplier_id}) class="bg-blue-600 text-black"> Edit </button>
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
  alert("Supplier Deleted");
  
}

async function handleEdit(id){
  document.querySelector('.edit-form-container').style.display = "block";
  const res = await fetch(`http://localhost:8000/supplier/edit/data/?id=${id};`);
  const data = await res.json();
 

  const supplierName = document.getElementById('edit-name');
  const supplierPhone = document.getElementById('edit-phone');
  const supplierEmail = document.getElementById('edit-email');
  const supplierCity = document.getElementById('edit-city');
  const hiddenId = document.getElementById('supplier-id');

  supplierName.value = data[0].supplie_name;
  supplierPhone.value = data[0].supplier_contact;
  supplierEmail.value = data[0].supplier_email;
  supplierCity.value = data[0].supplier_city; 
  hiddenId.value = data[0].supplier_id; 
 
}


async function handleSearch(event) {
  const supplierName = document.getElementById('search-supplier').value;
  if(event.key == "Enter") {
    const res = await fetch(`http://localhost:8000/supplier/search?name=${supplierName}`);
    const data = await res.json();
    displaySearch(data);
    
  }
}