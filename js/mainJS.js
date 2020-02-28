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
if(listKvest[i].relevant == "true"){
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



let valueUsers = document.getElementById("valueUsers");
let Action = document.getElementById("Action");
let Morphed = document.getElementById("Morphe");
let companySelect = document.getElementById("companySelect");
let myInput = document.getElementById("myInput");


map.set("valueUsers" , valueUsers.value);
map.set("Action" , Action.value);
if(Morphed.value == 'true'){
    map.set("Morphed" , 'morphe');
} else {
    map.set("Morphed" , Morphed.value);
}

map.set("companySelect" , companySelect.value);
map.set("myInput" , myInput.value.toUpperCase());

 createKvestList();
}

function createKvestList() {
let arreyKvest = document.getElementsByClassName("quest-card");
    let bool = true
for(let i = 0; i<arreyKvest.length; i++){



if(
    arreyKvest[i].getAttribute("kvestname").toUpperCase().indexOf(map.get("myInput")) >= 0
    && ( Number(arreyKvest[i].getAttribute("userMin")) <=  Number(map.get("valueUsers")) || map.get("valueUsers") == "")
    && Number(arreyKvest[i].getAttribute("userMax")) >= Number(map.get("valueUsers"))
    && (arreyKvest[i].getAttribute("company") == map.get("companySelect") || map.get("companySelect") == "Все компании")
    && ((map.get("Action") == "notrue" && map.get("Morphed") == "notrue") || (arreyKvest[i].getAttribute("Action") === map.get("Action") || arreyKvest[i].getAttribute("Action") === map.get("Morphed")))

){
    arreyKvest[i].style.display = "block"
    bool = false
} else {
    arreyKvest[i].style.display = "none"
}



}
    let tmp = document.getElementsByClassName("Nothing-found")
    if(bool == true && tmp.length < 1){


        let divFound = document.createElement('div')
        divFound.className = "divFound";
        document.getElementsByClassName("ticket")[0].appendChild(divFound);

        let span = document.createElement('span');
        span.className = "Nothing-found";
        span.innerHTML = "Нет совпадений. Попробуйте изменить условия поиска."
        document.getElementsByClassName("divFound")[0].appendChild(span);

        let blockquote = document.createElement('blockquote');
        blockquote.className = "blockquote";
        document.getElementsByClassName("divFound")[0].appendChild(blockquote);


        let pQuote = document.createElement('p');
        pQuote.className = "quote";
        pQuote.innerHTML = "Для Шерлока Холмса она всегда оставалась «Этой Женщиной». Я редко слышал, чтобы он называл ее каким-либо другим именем. В его глазах она затмевала всех представительниц своего пола. Не то чтобы он испытывал к Ирэн Адлер какое-либо чувство, близкое к любви. Все чувства, и особенно любовь, были ненавистны его холодному, точному, но удивительно уравновешенному уму. По-моему, он был самой совершенной мыслящей и наблюдающей машиной, какую когда-либо видел мир; но в качестве влюбленного он оказался бы не на своем месте. Он всегда говорил о нежных чувствах не иначе, как с презрительной насмешкой, с издевкой. Нежные чувства были в его глазах великолепным объектом для наблюдения, превосходным средством сорвать покров с человеческих побуждений и дел. Но для изощренного мыслителя допустить такое вторжение чувства в свой утонченный и великолепно налаженный внутренний мир означало бы внести туда смятение, которое свело бы на нет все завоевания его мысли."
        document.getElementsByClassName("blockquote")[0].appendChild(pQuote);

        let footer = document.createElement('footer');
        footer.className = "footerQuote";
        footer.innerHTML = "Приключения Шерлока Холмса (сборник) - Скандал в Богемии Нет совпадений."
        document.getElementsByClassName("blockquote")[0].appendChild(footer);



    } else if(bool == false && tmp.length > 0){
        document.getElementsByClassName("Nothing-found")[0].remove()
        document.getElementsByClassName("divFound")[0].remove()
        document.getElementsByClassName("blockquote")[0].remove()
        document.getElementsByClassName("quote")[0].remove()
        document.getElementsByClassName("footerQuote")[0].remove()
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
    //console.log(event.currentTarget);
    let bottom = document.getElementById(event.currentTarget.id);
    if(bottom.value == "true"){
        //console.log("Пришла правда");
        bottom.setAttribute("value", "notrue");
        bottom.checked = false;
    } else if(bottom.value == "notrue"){
       // console.log("Пришла лож");
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



