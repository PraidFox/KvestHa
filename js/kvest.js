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
    createPage()
    whichPosition()
}

function whichPosition() {
    if (document.body.offsetHeight > window.innerHeight) {
        //alert("Скролл есть и окно изменилось");
        document.querySelector('.mainFooter').style.position = 'relative'
    } else {
        //alert("Скролла нет и окно изменилос");
        document.querySelector('.mainFooter').style.position = 'absolute'
    }
}


function createPage() {

    let id = document.location.search.replace("?", "");
    let number
    for(let i = 0; i<jsonKV.length; i++){
        if (jsonKV[i].id == id){
            number = i;
            break;
        }
    }


    document.getElementsByClassName("imgQuest")[0].style.backgroundImage = "url('"+jsonKV[number].image+"')";
    document.getElementsByClassName("questName")[0].innerHTML = jsonKV[number].name;
    if(jsonKV[number].perfomance == "true"){
        document.getElementsByClassName("miniName")[0].innerHTML = "C участием актёра!"
    } else if( jsonKV[number].perfomance == "morphe" ){
        document.getElementsByClassName("miniName")[0].innerHTML = "Морфиус"
    } else {
        document.getElementsByClassName("wrap")[0].remove("wrap")
    }
    document.getElementsByClassName("description")[0].innerHTML = jsonKV[number].description;

    document.getElementsByClassName("minAge")[0].innerHTML = "Минимальный возвраст: "+jsonKV[number].ageMin +" лет";
    if(jsonKV[number].playersMax == jsonKV[number].playersMaxDop){
       document.getElementsByClassName("numberPlayers")[0].innerHTML = jsonKV[number].playersMin+" - "+jsonKV[number].playersMax + "<br>" + "игрока";
    } else {
        document.getElementsByClassName("numberPlayers")[0].innerHTML = jsonKV[number].playersMin+" - "+jsonKV[number].playersMax + " (+"+ (jsonKV[number].playersMaxDop - jsonKV[number].playersMax) +")" + "<br>" + "игрока";
    }

    document.getElementsByClassName("timeGame")[0].innerHTML = jsonKV[number].timeGame + "<br>" + "минут";
    if(jsonKV[number].priceMin == jsonKV[number].priceMax){
        document.getElementsByClassName("prise")[0].innerHTML = "Цена: "+jsonKV[number].priceMin + " рублей";
    } else {
        document.getElementsByClassName("prise")[0].innerHTML = "Цена от "+jsonKV[number].priceMin+" до " +jsonKV[number].priceMax + " рублей";
    }

    document.getElementsByClassName("site")[0].innerHTML = "<a href ="+jsonKV[number].site+"> " + "Перейти на сайт"+ "</a> ";
    document.getElementsByClassName("address")[0].innerHTML =  "Адрес: "+jsonKV[number].address;
    document.getElementsByClassName("phone")[0].innerHTML =  "Телефон: "+jsonKV[number].phone;

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