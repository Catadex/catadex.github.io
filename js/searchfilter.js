/*function fixQuery(key) {
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
}*/

function doSearch() {
    // Refresh catDB from window.inDB
    catDB = JSON.parse(inDB());
    //window.query

    // Prepare search query
    if (window.query === "") {
        window.query = ".*";
    }

    // Convert search string to search array
    let queryArray = window.query.split(" ");

    // Conduct search with the filter method
    /* let qPattern = new RegExp(window.query, "i"),
        qData = catDB.data.filter(x => qPattern.test(fixQuery(x.name + " " + x.alt))); */
    
    // Iterator to note down the entry numbers that match
    let iterator = [];

    // A double loop to match every single entry against every single query part
    for (let x = 0; x < catDB.data.length; x++) {
        for (let y = 0; y < queryArray.length; y++) {
            let qPattern = new RegExp(queryArray[y], "i");
            if (qPattern.test(fixQuery(catDB.data[x].name + " " + catDB.data[x].alt + " " + catDB.data[x].year))) {
                iterator.push(x);
            };
        }
    }

    // Remove duplicates by converting to set and back
    iterator = Array.from(new Set(iterator));

    // Produce filtered datalist
    let qData = iterator.map(index => catDB.data[index]);

    // Filter based on config filters
    let qFilter = document.querySelectorAll("section.filter filter[class*='tags']");

    for (let x = 0; x < qFilter.length; x++) {
        let qActive = qFilter[x].querySelectorAll("x.active");

        for (let y = 0; y < qActive.length; y++) {
            qPattern = new RegExp(qActive[y].getAttribute("data-value"), "i");
            qData = qData.filter(z => !qPattern.test(z.tags[x]));
        }
    }

    catDB.data = qData;

    writeOptions();
    writePage(1);
}