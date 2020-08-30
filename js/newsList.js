const request = new XMLHttpRequest();
request.responseType =	"json";
request.open("POST", 'https://kvestha.000webhostapp.com/api/product/read.php', true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

request.addEventListener("readystatechange", () => {

    if (request.readyState === 4 && request.status === 200) {
        let obj = request.response;
        createNews(obj);
    }
});

request.send();


function createNews(obj) {

    //console.log(obj.records)
    let j = 0
        for(let i = obj.records.length-1; i>=0; i--){



        let divOneValue = document.createElement('div');
        divOneValue.className = "divOneValue";
        document.getElementsByClassName("listNovosti")[0].appendChild(divOneValue);

        let spunTitle = document.createElement('span');
        spunTitle.className = "spunTitle";
        spunTitle.innerHTML = obj.records[i].title;
        document.getElementsByClassName("divOneValue")[j].appendChild(spunTitle);

        let divDescription = document.createElement('div');
        divDescription.className = "divDescription";
        divDescription.innerHTML = obj.records[i].description;
        document.getElementsByClassName("divOneValue")[j].appendChild(divDescription);

        let spunTime = document.createElement('span');
        spunTime.className = "spunTime";
        spunTime.innerHTML = obj.records[i].createde;
        document.getElementsByClassName("divOneValue")[j].appendChild(spunTime);

        j += 1


    }


}