function loadPDF(href) {
    var xmlHttp = new XMLHttpRequest();
    var url = href; // Use the href passed from the XBlock
    var parameters = "first=barack&last=obama"; // Example parameters, adjust as needed
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // Assuming the response is a direct PDF link or PDF data
            // Adjust this part based on the actual response format
            var iframe = document.getElementById('unit-iframe');
            // Set the src of the iframe to the PDF link or data received from the response
            iframe.src = xmlHttp.responseText;
        }
    }
    xmlHttp.send(parameters);
}