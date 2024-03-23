let thumb = document.querySelector("thumb"),
    filter = document.querySelector("section.filter");

function adjustBottomDistance() {
    const topgap = document.querySelector("header").offsetHeight + document.querySelector("section.search").offsetHeight;
    filter.setAttribute("style",`--bottom-distance: calc(-${topgap}px - 3rem)`);
}

function thumbOpen() {
    window.scrollTo({top: 0});
    adjustBottomDistance();
    thumb.classList.add("enabled");
    filter.classList.add("enabled");
    document.body.classList.add("no-scroll");
}
function thumbClose() {
    thumb.classList.remove("enabled");
    filter.classList.remove("enabled");
    document.body.classList.remove("no-scroll");
}

function thumbClick() {
    if (thumb.classList.contains("enabled")) {
        thumbClose();
    } else {
        thumbOpen();
    }
}

thumb.addEventListener("click",thumbClick);
window.addEventListener("resize",adjustBottomDistance);

document.addEventListener("click", function(event) {
    if (!event.target.tagName.match(/x/i)) {
        return;
    }
    if (event.target.classList.contains("active")) {
        event.target.classList.remove("active");
    } else {
        event.target.classList.add("active");
    }
    doSearch();
});

document.addEventListener("click", function(event) {
    if (!event.target.tagName.match(/y/i)) {
        return;
    }

    let ytags = document.querySelectorAll("section.filter filter.epage y.active");

    for (let x = 0; x < ytags.length; x++) {
        ytags[x].classList.remove("active");
    }

    localStorage.epage = event.target.getAttribute("data-value");
    event.target.classList.add("active");
    doSearch();
});