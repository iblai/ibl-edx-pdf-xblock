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
            var pdfContainer = document.getElementById('nunpai1');
            // Example: Insert an <iframe> or <object> tag to display the PDF
            pdfContainer.innerHTML = '<iframe src="' + xmlHttp.responseText + '" width="100%" height="600px"></iframe>';
        }
    }
    xmlHttp.send(parameters);
}

// Since the href is dynamically rendered, you'll need to pass it to loadPDF
// This can be done directly in the HTML template or via another script tag that initializes this function
