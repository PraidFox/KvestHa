window.onload = function(){
    whichPosition()
}

window.onresize= function(){
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