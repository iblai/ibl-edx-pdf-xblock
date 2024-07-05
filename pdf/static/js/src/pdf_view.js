function loadPDF(href) {
    var xmlHttp = new XMLHttpRequest();
    var url = href;
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var iframe = document.getElementById('unit-iframe');
            iframe.src = xmlHttp.responseText;
        }
    }
    xmlHttp.send();
}
