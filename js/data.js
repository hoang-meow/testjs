import getRouter ,{url, getUrlParam , getUrlId } from './router.js';
import { showData ,clearData } from './showData.js';
import { getUsers } from './user.js';
let data;
let roles;
let response;
let id;



let quyenFillter = document.getElementById('quyenFillter');
let token = JSON.parse(localStorage.getItem("token")).access_token;

let optionsUpdated ;
let optionsSelected;

let selectup = document.getElementById('quyenup');
let cnameup = document.getElementById("cnameup");
let cemailup = document.getElementById("cemailup");
let unameup = document.getElementById("unameup");
let phoneup = document.getElementById("phoneup");


let search = '';
let inactiveStatus = '';
let role_id = '';
let date_start ='';
let date_end = '';

const searchUserApi = () => {
    let input = document.getElementById("mySearch");
    search = input.value;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log(xhttp);

        response = JSON.parse(xhttp.responseText);
        data = response.list
        console.log("search-user", data);
        if (search != '') {
            clearData();
            showData(data);

        } else {
            getUsers();
        }

    }
    getUrlParam('searchUsers');

    xhttp.open("GET", url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", " Bearer " + token);
    xhttp.send();
}

function showUpdateUser(i) {
    selectup.innerHTML = "";
    getRoles(selectup);
       document.getElementById("myFormUpdate").style.display = "block";
       let data = i.currentTarget.myData;
       id = data[i.currentTarget.myParam].id;
       cemailup.value = data[i.currentTarget.myParam].email;
       cnameup.value = data[i.currentTarget.myParam].name;
       unameup.value = data[i.currentTarget.myParam].username;
       phoneup.value = data[i.currentTarget.myParam].mobile
       
       optionsSelected = data[i.currentTarget.myParam].roles;     
   }
function showDeleteUser(i) {
    let myFormDl = document.getElementById("myFormDl");
    let data = i.currentTarget.myData;
    id = data[i.currentTarget.myParam].id;
    myFormDl.style.display = "block";
    let notifi = document.createElement("h4");
    notifi.innerHTML = `Bạn có chắc muốn xóa`+" "+data[i.currentTarget.myParam].username+ `? Điều này hoàn toàn không thể hoàn tác!`;
 
    myFormDl.insertBefore(notifi,myFormDl.children[0]);
  

}
let status = document.getElementById('status');
status.addEventListener('change', changeStatus);

function changeStatus() {
    inactiveStatus = status.value;
    console.log(inactiveStatus);

    getUsers();
}

quyenFillter.addEventListener('change' , changeQuyen,false);
function changeQuyen() {
    role_id = quyenFillter.value;
    let options =  document.querySelectorAll('#quyenFillter option') ;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == role_id) {
            options[i].selected = true;
        }
    }  
    console.log(role_id);
    getUsers()
}

let begin = document.getElementById('begin');
begin.addEventListener('keyup' ,fillBeginday);

function fillBeginday(){
    let rsb = document.getElementById('begin').value;
    let symbol = "/";
    date_start = rsb.replace(`/${symbol}/g`,"%2F");
    console.log(date_start);
    
    getUsers()
}

let end = document.getElementById('end');
end.addEventListener('keyup' , fillEndday);
function fillEndday(){
    let rse = document.getElementById('end').value;
    let symbol = "/";
    date_end = rse.replace(`/${symbol}/g`,"%2F");
    console.log(date_end);
   
    getUsers()
}

function getRoles(element) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      
        
        roles = JSON.parse(xhttp.responseText);
        console.log("Roles", roles);
        if (xhttp.status == 200) {
            
            for (let i = 0; i < roles.length; i++) {
                let newOp = document.createElement('option');
                newOp.setAttribute('value', roles[i].id);
                newOp.innerHTML = roles[i].name;
                element.appendChild(newOp);
            }
            optionsUpdated =  document.querySelectorAll('#quyenup option');
            for (let i = 0; i < optionsUpdated.length ; i++) {
                for (let j = 0; j < optionsSelected.length;j++) {
                    if(optionsUpdated[i].value == optionsSelected[j].id) {
                        optionsUpdated[i].selected = true;
                    }
                }
            }
            console.log(optionsSelected);
        }
        
    }
    
    xhttp.open("GET", getRouter('roles'));
    xhttp.setRequestHeader("Authorization", " Bearer " + token);
    xhttp.send();
}

export {id ,search,inactiveStatus,role_id,date_start,date_end ,getRoles ,searchUserApi,showUpdateUser,showDeleteUser} 
