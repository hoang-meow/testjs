import { id, getRoles, searchUserApi } from "./data.js";
import getRouter, { url, getUrlParam, getUrlId } from './router.js';
import { showData, clearData } from './showData.js';
import { paginaTion } from './pagination.js';
import { getData } from "./dataClass.js";

let rs;
let token = JSON.parse(localStorage.getItem("token")).access_token;
let addUser = document.getElementById('addUser');
let updateUser = document.getElementById('updateUser');

let closeFr = document.getElementById('closeFr');
let closeFrUp = document.getElementById('closeFrUp');
let closeFrDl = document.getElementById('closeFrDl');
let showAddUser = document.getElementById('showAddUser');

let select = document.getElementById('quyen');
let selectup = document.getElementById('quyenup');

let cname = document.getElementById("cname");
let uname = document.getElementById("uname");
let cemail = document.getElementById("cemail");
let password = document.getElementById("password");
let verifyPassword = document.getElementById("verifyPassword");

let cnameup = document.getElementById("cnameup");
let cemailup = document.getElementById("cemailup");
let unameup = document.getElementById("unameup");
let phone = document.getElementById("phone");


let infome = document.getElementById("info");
let detailUser = document.getElementById("detailUser");
let infodetail = document.getElementById("infodetail");
let intodetail = document.getElementById("intodetail");
let logout = document.getElementById("logout");
let info;

// get User
getUsers()
function getUsers() {
    let params = getUrlParam('listUsers');
    let User = new getData(url, params, token);
    console.log(params);

    rs = User.getData();
    console.log(rs);
    clearData();
    showData(rs.list);
    paginaTion(rs.pagination);
    getInfoUser();

}

// add user

addUser.addEventListener('click', function userAddApi() {
    let newUser = {
        cname: cname.value,
        uname: uname.value,
        cemail: cemail.value,
        phone: phone.value,
        password: password.value,
        verifyPassword: verifyPassword.value,
        role_ids: getSelectValues(select),
    };
    getRouter('addUsers');
    let User = new getData(url, newUser, token);
    User.userAddApi();
    getUsers();

});



// update user
updateUser.addEventListener('click', function userUpdateApi() {
    let phoneup = document.getElementById('phoneup');
    let updateUser = {
        name: cnameup.value,
        username: unameup.value,
        email: cemailup.value,
        id: id,
        mobile: phoneup.value,
        role_ids: getSelectValues(selectup),
    };
    getUrlId('updateUser', id);
    let User = new getData(url, updateUser, token );
    User.userUpdateApi();
    getUsers();
});
// delete user
document.getElementById('deleteUser').addEventListener('click', function userDeleteApi() {

    getUrlId('deleteUser', id);
    let User = new getData(url, '', token);
    User.userDeleteApi();
    getUsers();

    closeForm();
})

// get info user
function getInfoUser() {
    getRouter('me');
    let User = new getData(url, '', token);
    info = User.getInfo();
    showUserLogin(info);
}


// update inforUser
function updateInfor() {
    console.log('updateinforUser');

    let nameinfo = document.getElementById('nameinfo');
    let phoneinfo = document.getElementById('phoneinfo');
    let updateInfor = {
        name: nameinfo.value,
        mobile: phoneinfo.value,
        avatar_base64: document.getElementById('b64').innerText
    };
    getRouter('me');
    let User = new getData(url, updateInfor, token);
    info = User.updateInfo();
    getInfoUser();
    intodetailUser()

}
// change password 
function saveChangePass(){
    getRouter('changePass');
    let passwordNow = document.getElementById('passwordNow');
    let password_confirmation = document.getElementById('password_confirmation');
    let old_password = document.getElementById('old_password');
    let newPass= {
        password: passwordNow.value,
        password_confirmation: password_confirmation.value,
        old_password: old_password.value
    };

    let User = new getData(url, newPass, token);
    let logout = User.changePassword();
    console.log(logout);
  
}

// logout user
function logoutUser() {
    getRouter('logout');
    let User = new getData(url, '', token);
    let logout = User.logout();
    console.log(logout.message);
    if (logout.message == "Successfully logged out") {
        localStorage.removeItem("token");
        window.location.replace("./login.html")
    }

}

function showUserLogin(info) {
    infome.innerHTML = "";
    let infoUserAv = document.createElement("li");
    infoUserAv.innerHTML = `<img src="` + info.user.avatar_url + `"alt="">`
    infome.appendChild(infoUserAv);
    let infoUserName = document.createElement("li");
    infoUserName.innerHTML = info.user.name;
    infome.appendChild(infoUserName);
}

function intodetailUser() {
    
    let listContenInfo = document.getElementById('listContenInfo');
    listContenInfo.innerHTML = "";
    document.getElementsByClassName('listsibar')[0].style.display = 'none';
    document.getElementsByClassName('contentUser')[0].style.display = 'none';
    document.getElementsByClassName('listinfo')[0].style.display = 'block';
    document.getElementsByClassName('contenInfoUser')[0].style.display = 'block';

    document.getElementById('nameinfo').value = info.user.name;
    document.getElementById('phoneinfo').value = info.user.mobile;
    let infoUserAv = document.createElement("li");
    infoUserAv.innerHTML = `<img src="` + info.user.avatar_url + `"alt="" style="display: inline-block; height: 200px; width:200px">`
    listContenInfo.insertBefore(infoUserAv, listContenInfo.firstChild);


}

let input = document.getElementById("mySearch");
input.addEventListener('keyup', searchUserApi);
let changePass = document.getElementById('changePass');
let changeAv = document.getElementById('changeAv');
let savePass = document.getElementById('savePass')
let infoShowload = document.getElementById('info');


showAddUser.addEventListener('click', showUser);
closeFr.addEventListener('click', closeForm);
closeFrUp.addEventListener('click', closeForm);
closeFrDl.addEventListener('click', closeForm);
infome.addEventListener('click', showDetailUser);

infoShowload.addEventListener('click', showDetailUser);
logout.addEventListener('click', logoutUser);
intodetail.addEventListener('click', intodetailUser);
saveInfo.addEventListener('click', updateInfor);
changePass.addEventListener('click', changePas);
changeAv.addEventListener('click', changeAvta);
savePass.addEventListener('click', saveChangePass);



function changeAvta(){
    document.getElementsByClassName('contenInfoUser')[0].style.display = 'block';
    document.getElementsByClassName('changePassInfo')[0].style.display = 'none';
}

function changePas(){
    document.getElementsByClassName('contenInfoUser')[0].style.display = 'none';
    document.getElementsByClassName('changePassInfo')[0].style.display = 'block';
}

function showDetailUser() {
    infodetail.innerHTML = "";
    let infoUserAv = document.createElement("li");
    infoUserAv.innerHTML = `<img src="` + info.user.avatar_url + `"alt="" style="display: inline-block; height: 40px;">`
    infodetail.appendChild(infoUserAv)
    let infoUserName = document.createElement("li");
    infoUserName.innerHTML = info.user.name;
    infodetail.appendChild(infoUserName)
    let infoUserRole = document.createElement("li");
    infoUserRole.innerHTML = info.user.role.name;
    infodetail.appendChild(infoUserRole);
    detailUser.insertBefore(infodetail, detailUser.firstChild)
    detailUser.classList.toggle("toggle");
}

function showUser() {
    document.getElementById("myForm").style.display = "block";
  
    if(document.querySelectorAll('#quyen option').length == 0){
        getRoles(select);
    }
    
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    select.innerHTML = "";
    selectup.innerHTML = "";
    document.getElementById("myFormUpdate").style.display = "none";
    document.getElementById("myFormDl").style.display = "none";
    let myFormDl = document.getElementById("myFormDl");
    myFormDl.removeChild(myFormDl.firstElementChild);
}
function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (let i = 0; i < options.length; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function readFile() {

    if (!this.files || !this.files[0]) return;

    const FR = new FileReader();

    FR.addEventListener("load", function (evt) {
        document.getElementById('b64').innerText = evt.target.result;

    });

    FR.readAsDataURL(this.files[0]);

}

document.querySelector("#myFile").addEventListener("change", readFile);


export { getUsers }