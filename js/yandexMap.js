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


let jsonAdd;

xhr.open('GET', 'js/JsAdd.json', false);
xhr.send();
if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
    jsonAdd = JSON.parse(xhr.responseText).jsJSON;
    //alert(jsonKV );
}

var map;

DG.then(function () {
    map = DG.map('map', {
        center: [48.48, 135.08],
        zoom: 12
    });

   for(let i = 0; i<jsonAdd.length; i++){
        /*DG.marker([jsonKV[i].mapsLong,jsonKV[i].mapsWodth]).addTo(map).bindPopup(' <ul class="navigation">\n' +
            '            <li><a href="index.html" class="verh">КВЕСТЫ</a></li>\n' +
            '            <li><a href="#" class="verh">КОМПАНИЯ</a></li>\n' +
            '            <li><a href="#" class="verh">КАРТА КВЕСТОВ</a></li>\n' +
            '            <li><a href="#" class="verh">ИМХО</a></li>\n' +
            '        </ul>');*/

        let pop = DG.marker([jsonAdd[i].mapsLong,jsonAdd[i].mapsWodth]).addTo(map);

       let arrayIDkvest = jsonAdd[i].arreyID.split(",")
       /*pop.bindLabel('Квестов: ' + arrayIDkvest.length, {
           static: true
       })*/
       let boody = ''
       for(let j = 0; j <arrayIDkvest.length; j++){
           boody += "<div><h2>"+jsonKV[arrayIDkvest[j]-2].name+"</h2></div>"
       }
       pop.bindPopup(boody);

    }
});

window.onload = function(){
    createList()
//createOsnova(jsonKV);
}

function createList(){
var wherever = document.getElementsByClassName("prokrutka");

for(let i = 0; i<jsonKV.length; i++){


    let div = document.createElement('div');
    div.className = "enigma";
    div.innerHTML = jsonKV[i].name;
    wherever[0].appendChild(div);

    let br = document.createElement('br');
    div.appendChild(br);

    let image = document.createElement('img');
    image.setAttribute("src", jsonKV[i].image);
    image.setAttribute("width", "100%");
    image.className = "imgList"
    div.appendChild(image);
    //div.appendChild(br);


}
}


