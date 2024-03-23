//tg://privatepost?channel=1234567890&post=0000
//tg://resolve?domain=telegram_official&post=000

function xUrl(key, val) {
    let post = val.getAttribute("data-post");
    if (isNaN(parseInt(key))) {
        return `tg://resolve?domain=${key}&post=${post}`;
    } else {
        return `tg://privatepost?channel=${key}&post=${post}`;
    }
}

document.addEventListener("click",function(event) {
    let et = event.target, eit = "";

    if (et.tagName.match(/item/i)) {
        eit = et;
    } else if (et.tagName.match(/ione/i)) {
        eit = et.parentNode;
    } else if (et.tagName.match(/iname/i)) {
        eit = et.parentNode.parentNode;
    } else if (et.tagName.match(/itags/i)) {
        eit = et.parentNode.parentNode;
    } else if (et.tagName.match(/span/i)) {
        if (et.parentNode.tagName.match(/itags/i)) {
            eit = et.parentNode.parentNode.parentNode;
        }
    }

    if (eit !== "") {
        window.location.assign(xUrl(xChannel, eit));
    }
});