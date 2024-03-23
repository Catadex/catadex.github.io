let inputBox = document.querySelectorAll("card.login input.text"),
    submitBtn = document.querySelector("card.login input.submit");

function allowSubmit() {
    if (inputBox[0].value !== "" && inputBox[1].value !== "") {
        submitBtn.classList.add("active");
    } else {
        submitBtn.classList.remove("active","anime","gradient");
    }
}

inputBox[0].addEventListener("input",allowSubmit);
inputBox[1].addEventListener("input",allowSubmit);

let loginForm = document.querySelector("card.login form"),
    nextForm = document.querySelector("card.next form"),
    linkBox = document.querySelector("card.next input.text");

function loginSubmit(event) {
    event.preventDefault();

    let dislink = document.location.origin;

    dislink = dislink + "/?" + encodeDisshit(inputBox[0].value.replace(/\.json$/,"").replace(/^https?\:\/\//,""));
    
    dislink = dislink + "&" + encodeDisshit(inputBox[1].value);

    linkBox.value = dislink;

    loginForm.parentNode.classList.add("hidden");
    nextForm.parentNode.classList.remove("hidden");
}

loginForm.addEventListener("submit",loginSubmit);