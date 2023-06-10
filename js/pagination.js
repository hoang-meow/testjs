import { getUsers } from "./user.js";
let detailPage = document.getElementById('detailPage');
let itemsPerPageId = document.getElementById("itemsPerPage");
let itemsPerPage = 5;
let currentPage = 1;

function paginaTion(pagination) {
    document.querySelector('.listPage').innerHTML = ''
    let total = pagination.total;
    let pageNumber = Math.ceil(total / itemsPerPage);
    // tao html
    let html = document.querySelector('.listPage');
    let prev = document.createElement('li');
    prev.innerText = '<<';
    prev.addEventListener('click',changePage,false);
    prev.myParam = currentPage-1;
   
    html.appendChild(prev);


    if (currentPage == 1 || pagination.count == 0) {
        prev.classList.add('inactive');
    }
    for (let i = 1; i <= pageNumber; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i == currentPage) {
            newPage.classList.add('active');
        }
        newPage.addEventListener('click',changePage,false);
        newPage.myParam = i;
        
        document.querySelector('.listPage').appendChild(newPage)

    }

    let next = document.createElement('li');
    next.innerText = '>>';
    next.addEventListener('click', changePage,false);
    next.myParam = currentPage+1;
  
    html.appendChild(next);
    if (currentPage == pageNumber || pagination.count == 0) {
        next.classList.add('inactive');
    }

    if (pagination.count == 0 ){
           
        detailPage.classList.add("inactive");
        itemsPerPageId.classList.add("inactive");
    } else {        
        detailPage.classList.remove("inactive");
        itemsPerPageId.classList.remove("inactive");
        detailPage.innerHTML =  ((currentPage-1)*itemsPerPage+1) +"-" + ((currentPage-1)*itemsPerPage + pagination.count )+"/"+pagination.total;
    }
}

function changePage(i) {
    currentPage = i.currentTarget.myParam;
    getUsers();
}

let itemsPerPages = document.getElementById('itemsPerPage');
itemsPerPages.addEventListener('change',changeItemsPerPage,false);

function changeItemsPerPage() {
    itemsPerPage = itemsPerPages.value
    console.log(itemsPerPage);
    currentPage = 1;
  
    getUsers()
}

export {currentPage, itemsPerPage,paginaTion}