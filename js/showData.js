import {showUpdateUser,showDeleteUser,getRoles} from './data.js'


let quyenFillter = document.getElementById('quyenFillter');
var table = document.getElementById('getUser');
function showData(data) {
    if (document.querySelectorAll('#quyenFillter option').length == 1){
        getRoles(quyenFillter)
    }

    for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
     
        newRow.setAttribute("id", "item");
        let name = document.createElement("td");
        name.innerHTML = data[i].name;
        let username = document.createElement("td");
        username.innerHTML = data[i].username;
        let mobile = document.createElement("td");
        mobile.innerHTML = data[i].mobile;
        let inactive = document.createElement("td");
        inactive.innerHTML = data[i].inactive;
        let quyen = document.createElement("td");
        for (let j = 0; j < data[i].roles.length; j++) {
            quyen.innerHTML += data[i].roles[j].name + " ";
        }

        let createdAt = document.createElement("td");
        createdAt.innerHTML = data[i].created_at;


        newRow.appendChild(name);
        newRow.appendChild(username);
        newRow.appendChild(mobile);
        newRow.appendChild(inactive);
        newRow.appendChild(quyen);
        newRow.appendChild(createdAt);

        let CrbtnDelete = document.createElement("button");
        CrbtnDelete.setAttribute("id","delete");
        CrbtnDelete.innerText = 'delete'; 
        let CrbtnUpdate = document.createElement("button");
        CrbtnUpdate.setAttribute("id","update");
        CrbtnUpdate.innerText = 'update'; 

        newRow.appendChild(CrbtnDelete);
        newRow.appendChild(CrbtnUpdate);
        
        CrbtnDelete.addEventListener("click",showDeleteUser);
        CrbtnDelete.myData = data;
        CrbtnDelete.myParam = i;
    
        CrbtnUpdate.addEventListener("click", showUpdateUser);
        CrbtnUpdate.myData = data;
        CrbtnUpdate.myParam = i;

        table.appendChild(newRow);
    }

}

function clearData() {
    table.innerHTML =      
    `<tr>
    <td>Tên hiển thị</td>
    <td>Tên đăng nhập</td>
    <td>Số điện thoại</td>
    <td>Trạng thái</td>
    <td>Quyền</td>
    <td>Ngày tạo</td>
    </tr>`
}

export {showData ,clearData}