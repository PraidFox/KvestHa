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
sortName()
//createOsnova(jsonKV);
}

function createOsnova(listKvest) {

    for(let i = 0; i<listKvest.length; i++){

    let div = document.createElement('a');
    div.className = "quest-card";
    div.href = "kvest.html?"+listKvest[i].id;
    div.setAttribute("kvestName", listKvest[i].name);
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
function sortName(){
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

function trueAction(){
    let tmp = [];
    for(let i = 0; i<jsonKV.length; i++){
        if(jsonKV[i].perfomance == "true"){
            tmp.push(jsonKV[i]);
        }
    }

    //console.log(tmp);
    document.getElementsByClassName("ticket")[0].innerHTML = "";
    createOsnova(tmp);

}

function myFunction(){
    let input = document.getElementById('myInput');
    let value = input.value.toUpperCase();
    let elements = document.getElementsByClassName("quest-card");
    console.log(value);
    for(let i = 0; i< elements.length; i++ ){
        if(elements[i].getAttribute("kvestname").toUpperCase().indexOf(value) < 0){
            elements[i].style.display = "none"
        }
        if(elements[i].getAttribute("kvestname").toUpperCase().indexOf(value) >= 0){
            elements[i].style.display = "block"
        }
    }

}
/*
let locationObj = document.location
locationObj.search
locationObj.search.replace("?", "")*/