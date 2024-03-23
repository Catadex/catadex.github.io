document.getElementsByTagName("body")[0].innerHTML = localGet("fable_index");

document.getElementsByTagName("footer")[0].outerHTML = localGet("parable_footer");

localforage.getItem("index_" + xNAME).then(function(event) {
    try {
        // see if the saved data is valid json
        const tjson = JSON.parse(event);

        // put the json as string in a global variable
        window.catDB = JSON.stringify(tjson);
    } catch {
        // if this works, then JSON was not valid in previous step
        // try to decompress data with pako
        const txt = pako.inflate(JSON.parse("[" + event + "]"));
        
        // set the decompressed data as a global variable
        const txt2 = new TextDecoder().decode(txt);
        
        // verify json validity of decompressed data
        const tjson = JSON.parse(txt2);
        
        // put the json as string in a global variable
        window.catDB = JSON.stringify(tjson);
    }
}).then(function() {
    let catJSON = JSON.parse(window.catDB);
    catJSON.info[0].tags_op = {};

    for (let x = 0; x < catJSON.info[0].tags.length; x++) {
        catJSON.info[0].tags_op[x] = [];

        for (let y = 0; y < catJSON.data.length; y++) {
            catJSON.info[0].tags_op[x].push(catJSON.data[y].tags[x]);
        }

        catJSON.info[0].tags_op[x] = Array.from(new Set(catJSON.info[0].tags_op[x]));

        catJSON.info[0].tags_op[x].sort();
    }

    window.catDB = JSON.stringify(catJSON);
}).then(function() {
    inScript(localGet("indbJS") +
             localGet("baseJS") +
             localGet("searchbehaviorJS") +
             localGet("thumbfilterJS") +
             localGet("databaseJS") +
             localGet("searchfilterJS") + 
             localGet("clickactionJS")
    ,"oneJS");
    
    appendectomy();
}).then(function() {
    if (!localStorage.epage) {
        localStorage.epage = 30;
    }

    document.querySelector(`section.filter filter.epage y[data-value='${localStorage.epage}']`).classList.add("active");
});