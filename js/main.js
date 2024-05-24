var webName = document.getElementById('webName')
var webUrl = document.getElementById('webUrl')
var tbody = document.getElementById('tbody')
var addBtn = document.getElementById('addBtn')
var webList ;



// To check if localStorage null or not
if(localStorage.getItem('item') == null){
    webList = [];
} else{
    webList = JSON.parse(localStorage.getItem('item'));
    display();
}


addBtn.onclick = function () {
  addProduct();
  clean();
  display();
};

// To create object , add all details about website in it and push it into array

function addProduct() {
  if(validation(webName) && validation(webUrl)){
    var webObj = {
      wName: webName.value,
      wUrl: webUrl.value,
    };
    webList. push(webObj);
    localStorage.setItem('item',JSON.stringify(webList))
  } else{
    addBtn.setAttribute('data-bs-toggle','modal')
    addBtn.setAttribute('data-bs-target','#staticBackdrop')
    console.log('dddd')
  }
}


// To clean form after adding website
function clean() {
  webName.value = null;
  webUrl.value = null;
}

// To display website into the table
function display() {
  var box = "";
  for (var i = 0; i < webList.length; i++) {
    box += `
    <tr>
      <th scope="row" class="text-center">${i+1}</th>
      <td class="text-center">${webList[i].wName}</td>
      <td class="text-center"><button type="" class="btn text-light px-3 btn-success" onclick="visitFun(${i})" id="visit"><i class="fa-solid fa-eye"></i> Visit</button></td>
      <td class="text-center"><button class="btn text-light px-3 btn-info" onclick="deleteFun(${i})" id="del"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`;
  }
  tbody.innerHTML = box
}

function deleteFun(index){
  webList.splice(index,1);
  display();
  localStorage.setItem('item',JSON.stringify(webList))
}

function visitFun(index){
  window.open(`https://${webList[index].wUrl}`)
}

function validation(ele){
  var Regex = {
    webName: /^[a-z]{3,}$/,
    webUrl: /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
  }
  if(Regex[ele.id].test(ele.value)){
    ele.classList.add('is-valid');
    ele.classList.remove('is-invalid');
    return true;
  } else{
    ele.classList.add('is-invalid');
    ele.classList.remove('is-valid');
    return false;
  }
}
