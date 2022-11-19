"use strict";
let currentPage = 1;
let totalPages;

function getUsers(page){

let requist = new XMLHttpRequest ();


requist.addEventListener ('load', function(){
let text = requist.responseText ;
let textjs = JSON.parse(text)

const fragment = new DocumentFragment();

textjs.data.forEach(item => {
    let li = document.createElement('li');

    li.innerText = `${item.first_name} ${item.last_name}`;
    li.classList = 'li-xml'
    fragment.appendChild(li);
});
    document.getElementById('ul-users').innerHTML =" ";  
    document.getElementById('ul-users').appendChild(fragment);

    totalPages = textjs.total_pages;

});


requist.addEventListener('error', function(){
    p.tcontent = 'Server Error';

    document.getElementById('api-users').appendChild(p);
});


requist.open('GET', 'https://reqres.in/api/users?page=' + page);
requist.send();

}

document.getElementById('previus').addEventListener('click', function(){
    if(currentPage==1) {
    return; 
}
    currentPage -= 1;
    getUsers(currentPage);
});

document.getElementById('loadmore').addEventListener('click', function(){ 
    if (currentPage == totalPages){
        return;
    }
    
    currentPage += 1;
    getUsers(currentPage);
});

getUsers(currentPage);

// fetch

fetch ('https://reqres.in/api/unknown', {
    method: 'GET'
})
.then (function(text2){
  if (text2.status !==200) {
    throw text2.status;
  } 
    return text2.json();

})

.then (function(text2js){
    let ul = document.createElement('ul');
    text2js.data.forEach(item => {
    let li = document.createElement('li');
    li.innerText = `${item.name} ${item.year}`;
    li.classList = 'li-fetch'
    
    ul.appendChild(li);
    });
    
document.getElementById('api-years').appendChild(ul);
})

.catch (function(error){
    if(error  == 404){
        let p = document.createElement('p');
        p.textconten = 'page not found';
        document.getElementById('api-users').appendChild(p);
    } else if (error == 500){
      let p = document.createElement('p');
      p.textconten = 'server error';
      document.getElementById('api-years').appendChild(p);
    }
});