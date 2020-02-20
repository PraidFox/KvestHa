var xhr = new XMLHttpRequest();
let jsonKV;
xhr.open('GET', 'js/KvestCSV.json', false);
xhr.send();
if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
    jsonKV = JSON.parse(xhr.responseText).kvests;
    //alert(jsonKV );
}

window.onload = function(){
oneSort();
createOption ();

}



function oneSort(){
    jsonKV.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });
    document.getElementsByClassName("ticket")[0].innerHTML = "";
    createOsnova(jsonKV);
}

function createOsnova(listKvest) {

    for(let i = 0; i<listKvest.length; i++){

    let div = document.createElement('a');
    div.className = "quest-card";
    div.href = "kvest.html?"+listKvest[i].id;
    div.setAttribute("kvestName", listKvest[i].name);
    div.setAttribute("userMin", listKvest[i].playersMin);
    div.setAttribute("userMax", listKvest[i].playersMax);
    div.setAttribute("company", listKvest[i].company);
    div.setAttribute("Action", listKvest[i].perfomance);
    div.setAttribute("onclick", "");
    div.style.backgroundImage = "url('"+listKvest[i].image+"')";
    div.style.textDecoration = "none";

    let divOne = document.createElement('div');
    divOne.className = "content-card";
    div.appendChild(divOne);

    let divTwo = document.createElement('div');
    divTwo.className = "top-content";
    divOne.appendChild(divTwo);

    let divThree = document.createElement('div');
    divThree.className = "genre";
    divThree.innerHTML = listKvest[i].company;
    divTwo.appendChild(divThree);

    let divFour = document.createElement('div');
    divFour.className = "rating";
    divFour.innerHTML = "от " + listKvest[i].playersMin + " до " + listKvest[i].playersMax;
    divTwo.appendChild(divFour);

    let content = document.createElement('div');
    content.className = "center-content";
    divOne.appendChild(content);

    let pContent = document.createElement('p');
    pContent.className = "info-content";
    if(listKvest[i].description.length > 350){
        pContent.innerHTML = listKvest[i].description.substr(0, 350)+"...";
    } else {
        pContent.innerHTML = listKvest[i].description;
    }

    content.appendChild(pContent);

    let bottomCont = document.createElement('div');
    bottomCont.className = "bottom-content";
    bottomCont.innerHTML = listKvest[i].name;
    divOne.appendChild(bottomCont);



    var wherever = document.getElementsByClassName("ticket");
    wherever[0].appendChild(div);
    }

}
function alertNOrating() {
    alert("Сортировка по рейтингу еще не добавлена. Если вы видите эту надпись значит разработчк забыл скрыть эту кнопку. За это мы отберём у него печеньки.")
}

function createOption() {

let companyMap = [];
for(let i = 0; i<jsonKV.length; i++){
    if(companyMap.indexOf(jsonKV[i].company) < 0){
        companyMap.push(jsonKV[i].company);
    }
}

let selectList = document.getElementById("companySelect")
for (let i = 0; i<companyMap.length; i++){
    var option = document.createElement("option");
    option.value = companyMap[i];
    option.text = companyMap[i];
    selectList.appendChild(option);
}
}

let map = new Map();

function createSearch() {

   /* let array = []*/

let valueUsers = document.getElementById("valueUsers");
let Action = document.getElementById("Action");
let companySelect = document.getElementById("companySelect");
let myInput = document.getElementById("myInput");


map.set("valueUsers" , valueUsers.value);
map.set("Action" , Action.value);
map.set("companySelect" , companySelect.value);
map.set("myInput" , myInput.value.toUpperCase());

 createKvestList();
}

function createKvestList() {
let arreyKvest = document.getElementsByClassName("quest-card");

for(let i = 0; i<arreyKvest.length; i++){
if(
    arreyKvest[i].getAttribute("kvestname").toUpperCase().indexOf(map.get("myInput")) >= 0
    && ( Number(arreyKvest[i].getAttribute("userMin")) <=  Number(map.get("valueUsers")) || map.get("valueUsers") == "")
    && Number(arreyKvest[i].getAttribute("userMax")) >= Number(map.get("valueUsers"))
    && (arreyKvest[i].getAttribute("company") == map.get("companySelect") || map.get("companySelect") == "Все компании")
    && (arreyKvest[i].getAttribute("Action") === map.get("Action") || map.get("Action") == "notrue")
){
    arreyKvest[i].style.display = "block"
} else {
    arreyKvest[i].style.display = "none"
}
}

    if (document.body.offsetHeight > window.innerHeight) {
        //alert("Скролл есть");
        document.querySelector('.mainFooter').style.position = 'relative'
    } else {
        //alert("Скролла нет");
        document.querySelector('.mainFooter').style.position = 'absolute'
    }
}

window.onresize= function(){
    if (document.body.offsetHeight > window.innerHeight) {
        //alert("Скролл есть и окно изменилось");
        document.querySelector('.mainFooter').style.position = 'relative'
    } else {
        //alert("Скролла нет и окно изменилос");
        document.querySelector('.mainFooter').style.position = 'absolute'
    }
}


function trueAction(){
    let bottom = document.getElementById("Action");
    if(bottom.value == "true"){
        console.log("Пришла правда");
        bottom.setAttribute("value", "notrue");
        bottom.checked = false;
    } else if(bottom.value == "notrue"){
        console.log("Пришла лож");
        bottom.setAttribute("value", "true");
        bottom.checked = true;
    }

    createSearch();
}









/*
function myFunction(){
    let input = document.getElementById('myInput');
    let value = input.value.toUpperCase();
    let elements = document.getElementsByClassName("quest-card");
    for(let i = 0; i< elements.length; i++ ){
        if(elements[i].getAttribute("kvestname").toUpperCase().indexOf(value) < 0){
            elements[i].style.display = "none"
        }
        if(elements[i].getAttribute("kvestname").toUpperCase().indexOf(value) >= 0){
            elements[i].style.display = "block"
        }
    }

}



function numberUsersMin() {
    let input = document.getElementsByClassName('oTDo');
    let value = input[0].value;
    let elements = document.getElementsByClassName("quest-card");
    for(let i = 0; i<elements.length; i++){
        if(elements[i].getAttribute("userMin").indexOf(value) < 0){
            elements[i].style.display = "none";
        }
        if(elements[i].getAttribute("userMin").indexOf(value) >= 0){
            elements[i].style.display = "block";
        }
    }
}


function numberUsersMax() {
    let input = document.getElementsByClassName('oTDo');
    let value = input[1].value;
    let elements = document.getElementsByClassName("quest-card");
    for(let i = 0; i<elements.length; i++){
        if(elements[i].getAttribute("userMax").indexOf(value) < 0){
            elements[i].style.display = "none";
        }
        if(elements[i].getAttribute("userMax").indexOf(value) >= 0){
            elements[i].style.display = "block";
        }
    }
}

*/



