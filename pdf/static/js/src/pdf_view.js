function loadPDF(href) {
    var xmlHttp = new XMLHttpRequest();
    var url = href; // The server endpoint that returns the PDF link
    xmlHttp.open("GET", url, true); // Use GET if you're retrieving a link; adjust accordingly
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var iframe = document.getElementById('unit-iframe');
            // Assuming the server response is a direct link to the PDF
            iframe.src = xmlHttp.responseText; // Set the iframe src to the response
        }
    };
    xmlHttp.send(); // No need to send data for a simple GET request
}