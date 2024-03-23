// Version Extension
const version = 20240223171523,
      datever = "?" + version.toString();

// Default settings
function setDefault(key,val) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key,val);
    }
}

// Path and Early
const path = window.location.pathname.replace(/\//g,"");

// Skip event check or not
let skip = false, pakoHere = false, forageHere = false, verHere = false, domHere = false, dataver = "";

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

// Function for adding script to head or body
function addScript(key, where) {
    let script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.setAttribute("src",key);
    if (where) {
        document.head.appendChild(script);
    } else {
        document.body.appendChild(script);
    }
}

// Function for adding style to head
function addStyle(key) {
    let style = document.createElement("link");
    style.setAttribute("rel","stylesheet");
    style.setAttribute("type","text/css");
    style.setAttribute("href",key);
    document.head.appendChild(style);
}

// Function for adding script to body as inline
function inScript(key, sid, where) {
    let script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    if (sid) {script.id = sid;}
    script.innerHTML = key;
    if (where) {
        document.head.appendChild(script);
    } else {
        document.body.appendChild(script);
    }
}

// Function for adding style to head as inline
function inStyle(key, sid) {
    let style = document.createElement("style");
    style.setAttribute("type","text/css");
    if (sid) {style.id = sid;}
    style.innerHTML = key;
    document.head.appendChild(style);
}

// Safety check on the queries
const sQuery = window.location.search;
let xSource = "", xChannel = "", xJSON = "", xJS = "", xNAME = "", xPath = false;

if (sQuery !== "") {
    xSource = decodeDisshit(sQuery.replace(/\?(.*)&.*/,"$1"));
    xChannel = decodeDisshit(sQuery.replace(/\?.*&(.*)/,"$1"));
    
    if (xSource.match(/\//)) { // at least one forward slash means it's a link
        xJSON = "https://" + xSource + ".json";
        xJS = xJSON.replace(/json$/,"js");
        xNAME = xJSON.replace(/.*\/([^\/]+)$/,"$1").replace(/\.json$/,"") + "_ex";
    } else {
        xJSON = window.location.origin + "/data/" + xSource + ".json";
        xJS = xJSON.replace(/json$/,"js");
        xNAME = xSource + "_in";
    }
    
    // if this is true, orator will allow saving the json and loading the list page
    xPath = true;
} else {
    xJSON = window.location.origin + "/data/null.json";
    xJS = xJSON.replace(/json$/,"js");
    xNAME = xJSON.replace(/.*\/([^/]+)$/,"$1").replace(/\.json$/,"");
}
setDefault("dataver_" + xNAME, "0");

// Remove all appendix js from DOM
function appendectomy() {
    let appendix = document.querySelectorAll("script[src*='appendix'],[appendix]");
    for (let x = 0; x < appendix.length; x++) {
        appendix[x].remove();
    }
}

// Clear load while keeping theme choice
function clearLoad() {
    localStorage.clear();
}

// Get local resource
function localGet(key) {
    if (!localStorage.getItem(key)) {
        clearLoad();
        window.location.reload();
    }
    return decodeURIComponent(localStorage.getItem(key));
}

// Fetching data and returning as text
async function fetchThis(url) {
    let response = await fetch(url),
        txt = await response.text();
    return txt;
}

// Event creation alongside global variable
function leadEvent(eventDetail) {
    let keyEvent = new CustomEvent("keyEvent", {
        detail: eventDetail
    });
    document.dispatchEvent(keyEvent);
}

// Lead event listener
document.addEventListener("keyEvent",function(e) {
    if (e.detail === "pako") {pakoHere = true;}
    if (e.detail === "forage") {forageHere = true;}
    if (!isNaN(parseInt(e.detail))) {verHere = true; dataver = parseFloat(e.detail);}
    forward();
});

// Move forward with loading the pages
function forward() {
    if (pakoHere && forageHere && verHere && domHere) {
        addScript("appendix/" + pathway()+datever, true);
    }
}

// Function for path redirection
function pathway() {
    if (path === "load" || !localStorage.version || parseFloat(localStorage.version) < version) {
        clearLoad();
        return "path_load.min.js";
    }

    if (verHere && parseFloat(localStorage.getItem("dataver_" + xNAME)) < dataver) {
        return "path_prep.min.js";
    }

    if (path === "index" || path === "prep") {
        return "path_404.min.js";
    }

    if (xPath && verHere) {
        return "path_index.min.js";
    }

    if (path === "") {
        return "path_home.min.js";
    }
    
    if (localStorage.getItem("fable_" + path)) {
        return "path_" + path + ".min.js";
    } else {
        return "path_404.min.js";
    }
}

// Main orator function
(function orator() {
    addScript(xJS, true);

    if (pathway().match(/_load\./)) {
        addScript("lib/pakoinflate.min.js", true);
        addScript("lib/localforage.min.js", true);
    } else {
        inScript(localGet("localforageLIB"),"localforageLIB", true);
        inScript(localGet("pakoinflateLIB"),"pakoinflateLIB", true);
    }

    if (!pathway().match(/_load\./)) { // Don't load fontasm and main CSS in the loading page
        inStyle(localGet("fontasmCSS"),"fontasmCSS");
        inStyle(localGet("alltherollCSS"),"alltherollCSS");
        inStyle(localGet("cascadiacodeCSS"),"cascadiacodeCSS");
        inStyle(localGet("radiocanadaCSS"),"radiocanadaCSS");
        inStyle(localGet("styleCSS"),"styleCSS");
    }

    document.addEventListener("DOMContentLoaded",function() {
        domHere = true;
        forward();
    });
})();