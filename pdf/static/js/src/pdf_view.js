function loadPDF(href) {
    var url = href; // The server endpoint that returns the PDF link

    // Asynchronously downloads PDF.
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
        console.log(`Document loaded, number of pages: ${pdfDoc.numPages}`);

        // Assume we want to render the first page only for simplicity
        pdfDoc.getPage(1).then(function(page) {
            var canvas = document.getElementById('pdf-canvas');
            var ctx = canvas.getContext('2d');
            var viewport = page.getViewport({scale: 1.5});

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function() {
                console.log('Page rendered');
            });
        });
    }).catch(function(error) {
        console.error('Error: ' + error.message);
    });
}
