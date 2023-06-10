export class getData {
    constructor(url,params,token,newUser,updateUser,updateInfo) {
        this.url = url ;
        this.params = params ;
        this.token = token;
        this.newUser = newUser;
        this.updateUser = updateUser;
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
        console.log(this.newUser.cname);
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.url ,false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", " Bearer " + this.token);
        xhttp.send(JSON.stringify({
            "name": this.newUser.cname,
            "username":  this.newUser.uname,
            "email":  this.newUser.cemail,
            "mobile" :this.newUser.phone,
            "password":  this.newUser.password,
            "password_confirmation":  this.newUser.verifyPassword,
            "role_ids":  this.newUser.role_ids,
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
            "name": this.updateUser.name,
            "username": this.updateUser.username,
            "email": this.updateUser.email,
            "id": this.updateUser.id,
            "mobile": null,
            "role_ids": this.updateUser.role_ids,
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
            "mobile" :this.params.phone,
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