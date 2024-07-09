function loadPDF(href) {
    var url = href; // The server endpoint that returns the PDF link

    if (!url) {
        console.error("Error: URL is undefined or null.");
        return; // Exit the function if url is not valid
    }

    // Asynchronously downloads PDF.
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
        // Get container for PDF pages
        var container = document.getElementById('pdf-container');
        var loader = document.getElementById('pdf-loader'); // Get the loader element

        if (!container) {
            console.error("Error: PDF container element not found.");
            return; // Exit the function if container is not found
        }

        if (!loader) {
            console.error("Error: PDF loader element not found.");
            // Not returning here as loader is not critical for PDF rendering
        }

        // Mimic iframe style for the container
        container.style.border = "1px solid #000";
        container.style.overflowY = "scroll"; // Ensure only vertical scrolling
        container.style.width = "100%";
        container.style.maxHeight = "600px"; // Adjust as needed
        container.style.position = "relative"; // For positioning the gradient/shadow

        // Custom scrollbar for WebKit browsers
        container.style.scrollbarWidth = "thin";
        container.style.scrollbarColor = "#888 #ffffff";

        // Gradient/shadow at the top and bottom as a visual cue for scrollability
        container.style.boxShadow = "inset 0 8px 8px -8px rgba(0,0,0,0.5), inset 0 -8px 8px -8px rgba(0,0,0,0.5)";

        // Clear existing content
        container.innerHTML = '';

        let renderedPagesCount = 0; // Initialize rendered pages counter

        // Loop through each page
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            pdfDoc.getPage(pageNum).then(function(page) {
                // Create canvas for this page
                var canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'pdf-canvas-' + pageNum);
                var ctx = canvas.getContext('2d');

                var viewport = page.getViewport({scale: 1.5});
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Style the canvas to mimic a page inside an iframe
                canvas.style.display = "block";
                canvas.style.margin = "0 auto";
                canvas.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)"; // Optional: adds shadow for depth

                // Append canvas to container
                container.appendChild(canvas);

                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function() {
                    renderedPagesCount++; // Increment the counter after each page is rendered

                    // Check if all pages have been rendered
                    if (renderedPagesCount === pdfDoc.numPages) {
                        if (loader) loader.style.display = 'none'; // Hide the loader if it exists
                    }
                });
            });
        }
    }).catch(function(error) {
        console.error('Error loading PDF: ' + error.message);
    });
}
