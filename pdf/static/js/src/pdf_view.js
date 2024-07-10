document.addEventListener('DOMContentLoaded', function() {
  const href = "{href}"; // Ensure this is the correct path to your PDF
  const isStudio = window.location.hostname.startsWith('studio.');
  const isMozilla = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if (isStudio || !isMozilla) {
	document.querySelector('.pdf_block_iframe').style.display = 'block';
  } else {
	document.querySelector('.pdf_block').style.display = 'block';
	renderFirstPage(href);
	setupDownloadButton(href);
  }
});

function renderFirstPage(pdfPath) {
  pdfjsLib.getDocument(pdfPath).promise.then(function(pdf) {
	pdf.getPage(1).then(function(page) {
	  var canvas = document.getElementById('pdf-canvas');
	  var context = canvas.getContext('2d');
	  var viewport = page.getViewport({scale: 1});
	  canvas.height = viewport.height;
	  canvas.width = viewport.width;
	  page.render({canvasContext: context, viewport: viewport});
	});
  });
}

function setupDownloadButton(pdfUrl) {
  const downloadButton = document.getElementById('pdf_download');
  downloadButton.addEventListener('click', function(event) {
	event.preventDefault();
	const fileName = pdfUrl.split('/').pop();
	downloadButton.href = pdfUrl;
	downloadButton.download = fileName;
	downloadButton.click();
  });
}