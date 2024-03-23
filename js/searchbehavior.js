const search = document.querySelectorAll("section.search form input"),
      form = document.querySelector("section.search form");

// 0 = text; 1 = button; 2 = submit;
window.query = "";

function checkText() {
    if (search[0].value === "") {
        search[0].parentNode.classList.remove("active");
    } else {
        search[0].parentNode.classList.add("active");
    }
}

function fixQuery(key) {
    let temp = key;
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < badChar.length; y++) {
            temp = temp.replace(badChar[y],"");
        }
        temp = temp.replace(/é/g,"e");
        temp = temp.replace(/&/g,"and");
        temp = temp.replace(/\s{2}/g," ");
        temp = temp.replace(/\s$/g,"");
        temp = temp.replace(/^\s/g,"");
    }
    return temp;
}
/*
function fixChar() {
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < badChar.length; y++) {
            search[0].value = search[0].value.replace(badChar[y],"");
        }
        search[0].value = search[0].value.replace(/é/g,"e");
        search[0].value = search[0].value.replace(/&/g,"and");
        search[0].value = search[0].value.replace(/\s\s/g," ");
        search[0].value = search[0].value.replace(/\s$/g,"");
        search[0].value = search[0].value.replace(/^\s/g,"");
    }
}*/

// run this function to emulate click to search
function clickSearch() {
    //fixChar();
    window.query = fixQuery(search[0].value);
    doSearch();
}

search[0].addEventListener("input", function() {
    checkText();
    clickSearch();
});

search[1].addEventListener("click", function() {
    search[0].value = "";
    checkText();
    clickSearch();
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
    clickSearch();
});