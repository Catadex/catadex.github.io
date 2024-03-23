// Encoding
function encodeDisshit(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

// Decoding
function decodeDisshit(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// Characters to remove from search query
const badChar = [
    "^",
    "$",
    ".",
    "|",
    "\\",
    "*",
    "?",
    "+",
    "{",
    "}",
    ",",
    "[",
    "]",
    ":",
    "(",
    ")",
    "-",
    "=",
    "!",
    ";",
    "#",
    "<",
    ">"
];

// logo-home click to reload
document.getElementsByClassName("logo-home")[0].addEventListener("click",function() {
    window.location.reload();
});