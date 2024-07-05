// Import PDF.js functions
import { getDocument } from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs';

document.addEventListener('DOMContentLoaded', function() {
  // Assuming "{href}" is replaced with the actual URL before this script runs
  const pdfURL = document.querySelector('.pdf_block iframe').getAttribute('src');
  loadPDF(pdfURL);
});

async function loadPDF(href) {
    console.log("Requesting PDF from URL:", href); // Log the requested URL

    try {
        const pdfDoc = await getDocument(href).promise;
        console.log("PDF loaded, number of pages:", pdfDoc.numPages);

        // Example: Render the first page of the PDF
        const page = await pdfDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;

        // Replace the iframe with the canvas or append the canvas to the desired element
        const iframe = document.getElementById('unit-iframe');
        iframe.replaceWith(canvas); // This replaces the iframe with the canvas
        console.log("PDF rendered to canvas.");
    } catch (error) {
        console.error("Failed to load PDF from:", href, error);
    }
}