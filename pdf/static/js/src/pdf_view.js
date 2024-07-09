function loadPDF(href) {
    console.log("loadPDF called with href:", href); // Log the initial href value

    var url = href; // The server endpoint that returns the PDF link

    if (!url) {
        console.error("Error: URL is undefined or null.");
        return; // Exit the function if url is not valid
    }

    // Asynchronously downloads PDF.
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
        console.log(`Document loaded, number of pages: ${pdfDoc.numPages}`);

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

                // Append canvas to container
                container.appendChild(canvas);

                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function() {
                    console.log('Page ' + pageNum + ' rendered');
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
