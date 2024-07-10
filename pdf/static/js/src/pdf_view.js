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
        // Get the first page
        pdfDoc.getPage(1).then(function(page) {
            // Create canvas for this page
            var canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'pdf-canvas-1');
            var ctx = canvas.getContext('2d');

            var viewport = page.getViewport({scale: 1.5});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Style the canvas to mimic a page inside an iframe
            canvas.style.display = "block";
            canvas.style.margin = "0 auto";
            canvas.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)"; // Optional: adds shadow for depth

            // Create an anchor tag to wrap the canvas
            var link = document.createElement('a');
            link.href = href; // Assuming 'href' is the variable containing the URL
            link.target = '_blank'; // Open in a new tab
            link.title = 'Open PDF viewer'; // Tooltip on hover
            link.appendChild(canvas); // Add the canvas to the link

            // Append the link (with the canvas inside) to the container
            container.appendChild(link);

            // Create a text node or paragraph for the hyperlink and page count
            var pageInfo = document.createElement('p');
            pageInfo.style.textAlign = "center"; // Center align the text
            pageInfo.innerHTML = `1 of ${pdfDoc.numPages} total pages. <a href="${href}" target="_blank" title="Open PDF viewer">Open PDF Viewer</a>`;

            // Append the pageInfo under the link
            container.appendChild(pageInfo);

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function() {
                if (loader) loader.style.display = 'none'; // Hide the loader if it exists
            });
        });
    }).catch(function(error) {
        console.error('Error loading PDF: ' + error.message);
    });
}

function adjustCanvasSize() {
    const container = document.getElementById('pdf-container');
    if (!container) return;

    const canvases = container.getElementsByTagName('canvas');
    if (canvases.length === 0) return;

    const containerWidth = container.clientWidth;
    const containerHeight = Math.min(container.clientHeight, 600); // Use 600px or the current height

    Array.from(canvases).forEach(canvas => {
        const aspectRatio = canvas.width / canvas.height;

        let newWidth = containerWidth;
        let newHeight = newWidth / aspectRatio;

        if (newHeight > containerHeight) {
            newHeight = containerHeight;
            newWidth = newHeight * aspectRatio;
        }

        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
    });
}

function adjustContainerMaxHeight() {
    const container = document.getElementById('pdf-container'); // Make sure to replace 'pdf-container' with the actual ID of your container
    if (!container) return;

    // Example: Set maxHeight to be 80% of the viewport height
    const viewportHeight = window.innerHeight;
    const maxHeight = viewportHeight * 0.8; // Adjust the 0.8 value to change the percentage of the viewport height used
    container.style.maxHeight = `${maxHeight}px`;
}
