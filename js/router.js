import { endpoint } from "./env.js";
import { search,inactiveStatus,role_id,date_start,date_end } from "./data.js";
import { currentPage, itemsPerPage} from "./pagination.js";

let url;

const routers = {
    listUsers: "users",
    addUsers: "users",
    updateUser: "users",
    deleteUser: "users",
    searchUsers: "users",
    roles: "roles",
    me:"me",
    logout:"web-logout",
    changePass:"me/password",
};
function getUrlParam(router) {
    getRouter(router);
    url += '?with=roles,createdBy&paginate=true'
    + '&page=' + currentPage
    + '&itemsPerPage=' + itemsPerPage 
    + '&search=' + search 
    + '&inactive=' + inactiveStatus 
    + '&role_id='+ role_id
    + '&date_start='+ date_start
    + '&date_end='+ date_end;
}
function getUrlId(router ,id) {
    getRouter(router) ;
    url +=  ("/" + id);
}



const getRouter = (key) =>{
    return url = endpoint + routers[key];
}

export { url ,getUrlParam , getUrlId };
export default getRouter;