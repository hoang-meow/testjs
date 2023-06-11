export class getData {
    constructor(url,params,token) {
        this.url = url ;
        this.params = params ;
        this.token = token;
    }

    getData() {
        const xhttp = new XMLHttpRequest();
        
        console.log(this.url);
        xhttp.open("GET", this.url,false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send();
        console.log("getUsers");
        let data = JSON.parse(xhttp.responseText);
        return data
    }

    userAddApi() {
        console.log(this.params.cname);
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.url ,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send(JSON.stringify({
            "name": this.params.cname,
            "username":  this.params.uname,
            "email":  this.params.cemail,
            "mobile" :this.params.phone,
            "password":  this.params.password,
            "password_confirmation":  this.params.verifyPassword,
            "role_ids":  this.params.role_ids,
        }));
        console.log("Add-User");
        let data = JSON.parse(xhttp.responseText);
        return data
    }

    userUpdateApi() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", this.url,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token)
        xhttp.send(JSON.stringify({
            "name": this.params.name,
            "username": this.params.username,
            "email": this.params.email,
            "id": this.params.id,
            "mobile": this.params.mobile,
            "role_ids": this.params.role_ids,
        }))
        console.log("Update-User");
        let data = JSON.parse(xhttp.responseText);
        return data
    }

    userDeleteApi() {
        const xhttp = new XMLHttpRequest();
   
        xhttp.open("DELETE", this.url ,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send();
        console.log("Delete-User");
        let data = JSON.parse(xhttp.responseText);
        return data
    }

    getInfo () {
        const xhttp = new XMLHttpRequest();
   
        xhttp.open("GET", this.url,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send(JSON.stringify({
            "name": this.params.name,      
            "mobile": this.params.mobile, 
            "avatar_base64": this.params.avatar_base64,
        }))
        console.log("GET-INFOR-User");
        let data = JSON.parse(xhttp.responseText);
        console.log("info",data.user);
        return data
    }

    updateInfo () {
        const xhttp = new XMLHttpRequest();
   
        xhttp.open("POST", this.url,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send(JSON.stringify({
            "name": this.params.name,
            "mobile" :this.params.mobile,
            "avatar_base64":  this.params.avatar_base64,
        }));
        let data = JSON.parse(xhttp.responseText);
        console.log("Update-INFOR-User",data.user);
        return data
    }
    changePassword () {
        const xhttp = new XMLHttpRequest();
   
        xhttp.open("PUT", this.url,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send(JSON.stringify({
            "password": this.params.password,
            "password_confirmation" :this.params.password_confirmation,
            "old_password":  this.params.old_password,
        }));
        let data = JSON.parse(xhttp.responseText);
        console.log("Update-INFOR-User",data.user);
        return data
    }

    logout () {
        const xhttp = new XMLHttpRequest();
   
        xhttp.open("POST", this.url,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send();
        console.log("LOGOUT-User");
        let data = JSON.parse(xhttp.responseText);
        console.log("LOGOUT",data);
        return data
    
    }

}