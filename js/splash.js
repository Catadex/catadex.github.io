let dots = document.querySelectorAll(".dots");

setInterval(function() {
    if (dots[0].innerHTML.match(". . .")) {
        dots[0].innerHTML = ".";
        dots[1].innerHTML = dots[0].innerHTML;
    } else if (dots[0].innerHTML.match(". .")) {
        dots[0].innerHTML = ". . .";
        dots[1].innerHTML = dots[0].innerHTML;
    } else {
        dots[0].innerHTML = ". .";
        dots[1].innerHTML = dots[0].innerHTML;
    }
}, 300);