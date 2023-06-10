
let username = document.getElementById('username');
let password = document.getElementById('password');


function login() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log(xhttp);
        document.getElementById('login').innerHTML = xhttp.response;
        localStorage.setItem('token', xhttp.response);
        if ( xhttp.status == 200) {
            window.location.replace("./user.html")
        } 
    }
    xhttp.open("POST", "https://httpdl.howizbiz.com/api/web-authenticate");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username="+ username.value +"&password=" + password.value);
    localStorage.setItem('token', xhttp.responseText);
    localStorage.setItem('username', username.value);
    localStorage.setItem('password', password.value);

   
}
