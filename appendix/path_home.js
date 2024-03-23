document.getElementsByTagName("body")[0].innerHTML = localGet("fable_home");

document.getElementsByTagName("footer")[0].outerHTML = localGet("parable_footer");

document.getElementById("cUpdated").innerHTML = "Proudly FOSS";

inStyle("","gradientAnimation");

inScript(localGet("baseJS") +
         localGet("gradientanimationJS") +
         localGet("homesubmitJS") +
         localGet("nextbuttonsJS")
,"oneJS");

appendectomy();