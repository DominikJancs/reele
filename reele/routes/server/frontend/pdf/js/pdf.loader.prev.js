let currentPDF = {};

function resetCurrentPDF() {
	currentPDF = {
		file: null,
		countOfPages: 0,
		currentPage: 1,
		zoom: 1.5
	}
}

function loadOutPDF(data , parent, pagesDisp, datapages) {
	const pdfFile = pdfjsLib.getDocument(data);
	resetCurrentPDF();
	pdfFile.promise.then((doc) => {
		currentPDF.file = doc;
		currentPDF.countOfPages = doc.numPages + 1;
		var pages = renderPrevPages(parent, pagesDisp);
		datapages.setAttribute('data-pages', pages);
	});

}

function renderPrevPages(parent, allpage) {
	var index = -1;
	for (let i = 0; i < currentPDF.countOfPages; i++) {
		currentPDF.file.getPage(i).then((page) => {
			var pageBX = document.createElement('div');
			pageBX.id = `pagebx-${i}`;
			pageBX.className = "pageBX";
			parent.appendChild(pageBX);
			var currentPageBX = document.querySelector(`#pagebx-${i}`);

			var pageItem = document.createElement('canvas');
			pageItem.id = `page-${i}`;
			pageItem.className = "prev-page";
			currentPageBX.appendChild(pageItem);
			var currentCanvas = document.querySelector(`#page-${i}`);

			var pageIndicator = document.createElement('div');
			pageIndicator.id = `pagei-${i}`;
			pageIndicator.className = "pageindicator";
			currentPageBX.appendChild(pageIndicator);
			document.querySelector(`#pagei-${i}`).innerHTML = `${i}/${currentPDF.countOfPages - 1}`;

			var context = currentCanvas.getContext('2d');
			var viewport = page.getViewport({ scale: currentPDF.zoom, });
			currentCanvas.height = viewport.height;
			currentCanvas.width = viewport.width;
	
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			page.render(renderContext);
		});
		index++;
	}
	allpage.classList.remove('hidden');
	allpage.innerHTML = `Pages: ${index}`;

	return index;
}
