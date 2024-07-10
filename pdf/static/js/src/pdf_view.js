function loadPDF(pdfUrl) {
  // Loading the PDF
  pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
    // Getting the first page
    pdf.getPage(1).then(function(page) {
      // Setting up the viewport and canvas for rendering the first page
      var viewport = page.getViewport({scale: 1.0});
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render the page onto the canvas
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      page.render(renderContext).then(function() {
        // Once rendered, wrap the canvas in an <a> tag to make it a clickable link
        var link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank'; // Open in a new tab
        link.appendChild(canvas); // Add the canvas (with the first page rendered) to the link

        // Append the link (with the canvas) to the body or a specific element on the page
        document.body.appendChild(link);

        console.log('First page of PDF rendered and linked.');
      });
    });
  }).catch(function(error) {
    console.error('Error loading PDF: ', error);
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

function setupPdfDownloadButton(url) {
    const downloadButton = document.getElementById('pdf_download');
    if (!downloadButton) return;

    // Extract the filename from the URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1] || 'download.pdf';

    // Set the href and download attributes of the button
    downloadButton.href = url;
    downloadButton.download = fileName;
}