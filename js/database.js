//window.catDB;
let catDB = JSON.parse(inDB()),//window.inDB,
    currentPage = 1,
    pagi = document.querySelector("section.list pages"),
    filters = document.querySelector("section.filter filters"),
    secList = document.querySelector("section.list list"),
    secBlank = document.querySelector("section.list blank");

// determine items for each page from saved value
function eachPage() {
    if (!localStorage.epage) {
        localStorage.epage = 30;
    }
    return parseInt(localStorage.epage);
}

// automatically determine total number of pages
function totalPages() {
    if (parseInt(catDB.data.length / eachPage()) < (catDB.data.length / eachPage())) {
        return (parseInt(catDB.data.length / eachPage()) + 1);
    } else {
        return parseInt(catDB.data.length / eachPage());
    }
}

function writeInfo() {
    // Write channel name
    document.getElementById("cName").innerText = catDB.info[0].cname;

    // Update page title
    document.title = catDB.info[0].cname;
    
    // Write update date
    document.getElementById("cUpdated").innerText = "Updated on " + catDB.info[0].date;

    // update filters
    let press = "";

    function writeFilter(key,num) {
        let print = "";

        for (let x = 0; x < catDB.info[0][key + "_op"][num].length; x++) {
            print = print + `<x data-value="${catDB.info[0][key + "_op"][num][x]}">${catDB.info[0][key + "_op"][num][x]}</x>`;
        }

        return `<filter class="flex flex-column gap g05 ${key + num}"><fname>${catDB.info[0][key][num]}</fname><ftags class="flex flex-center-h flex-wrap gap g05">${print}</ftags></filter>`;
    }

    for (let x = 0; x < catDB.info[0].tags.length; x++) {
        press = press + writeFilter("tags",x);
    }

    filters.innerHTML = filters.innerHTML + press;
}

// update pagination
function writeOptions() {
    let print = "";

    for (let x = 1; x < (totalPages() + 1); x++) {
        print = print + `<option value="${x}">${x}</option>`;
    }

    pagi.children[2].innerHTML = print;
}

// function for adding items
function writeItem(called,wiki,post,tags,rank) {
    let print = "";

    for (let x = 0; x < tags.length; x++) {
        print = print + `<span>${tags[x]}</span>`;
    }
    
    return `<item class="flex flex-center-v gap g10" data-rank="${rank}" data-post="${post}"><a href="${wiki}" target="_blank" class="flex flex-center-h flex-center-v wiki"><i class="fa fa-info"></i></a><ione class="flex flex-column flex-reverse flex-center-v gap g05"><iname>${called}</iname><itags class="flex gap g05">${print}</itags></ione></item>`;
}

// writeItem(catDB.data[0].name,catDB.data[0].year,catDB.data[0].wiki,catDB.data[0].post,catDB.data[0].tags);

// function for updating torrents according to page number
function writePage(num) {
    num = parseInt(num);
    let print = "",
        start = ((num * eachPage()) - eachPage()),
        end = (num * eachPage());

    if (end > catDB.data.length) {
        end = catDB.data.length;
    }

    for (let x = start; x < end; x++) {
        print = print + writeItem(catDB.data[x].name,catDB.data[x].wiki,catDB.data[x].post,catDB.data[x].tags,catDB.data[x].rank);
    }

    secList.innerHTML = print;

    // update pagination
    currentPage = num;
    pagi.children[2].value = num;

    if (num === 1) {
        pagi.children[0].classList.add("disabled");
        pagi.children[1].classList.add("disabled");
    } else {
        pagi.children[0].classList.remove("disabled");
        pagi.children[1].classList.remove("disabled");
    }

    if (num === totalPages()) {
        pagi.children[3].classList.add("disabled");
        pagi.children[4].classList.add("disabled");
    } else {
        pagi.children[3].classList.remove("disabled");
        pagi.children[4].classList.remove("disabled");
    }

    if (totalPages() <= 1) {
        pagi.classList.add("hidden");
    } else {
        pagi.classList.remove("hidden");
    }
    if (totalPages() < 1) {
        secBlank.classList.remove("hidden");
    } else {
        secBlank.classList.add("hidden");
    }
}

// initiate page by default once
writeInfo();
writeOptions();
writePage(1);

// make pagination functional
pagi.children[0].addEventListener("click",function() {
    if (pagi.children[0].classList.contains("disabled")) {return;}
    writePage(1);
});
pagi.children[1].addEventListener("click",function() {
    if (pagi.children[1].classList.contains("disabled")) {return;}
    writePage(currentPage - 1);
});
pagi.children[3].addEventListener("click",function() {
    if (pagi.children[3].classList.contains("disabled")) {return;}
    writePage(currentPage + 1);
});
pagi.children[4].addEventListener("click",function() {
    if (pagi.children[4].classList.contains("disabled")) {return;}
    writePage(totalPages());
});
pagi.children[2].addEventListener("change",function() {
    writePage(pagi.children[2].value);
});