function loadPDF(href) {
    console.log("Requesting PDF from URL:", href); // Log the requested URL
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", href, true);
    xmlHttp.responseType = 'blob'; // Expect a Blob response

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            console.log("Request state: 4, Status:", xmlHttp.status); // Log the status upon completion
            if (xmlHttp.status === 200) {
                var blob = new Blob([xmlHttp.response], { type: 'application/pdf' });
                var url = URL.createObjectURL(blob);
                console.log("Blob URL created:", url); // Log the Blob URL
                var iframe = document.getElementById('unit-iframe');
                iframe.src = url; // Set the iframe src to the Object URL
                console.log("Iframe src set to:", iframe.src); // Log the iframe src attribute
            } else {
                console.error("Failed to load PDF from:", href); // Log error on failure
            }
        }
    };
    xmlHttp.send();
}