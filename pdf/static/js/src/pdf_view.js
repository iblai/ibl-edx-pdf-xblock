function loadPDF(href) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", href, true);
    xmlHttp.responseType = 'blob'; // Expect a Blob response

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var blob = new Blob([xmlHttp.response], { type: 'application/pdf' });
            var url = URL.createObjectURL(blob);
            var iframe = document.getElementById('unit-iframe');
            iframe.src = url; // Set the iframe src to the Object URL
        }
    };
    xmlHttp.send();
}