let currentPDF = {};
var header = document.body.getAttribute("data-reele"),
  prevPages = document.querySelector("#prev_page"),
  bookmarks = document.querySelector('#bookmarks'),
  headerPages = document.querySelector("#header-pages");

function resetCurrentPDF() {
  currentPDF = {
    file: null,
    countOfPages: 0,
    currentPage: 1,
    zoom: 1.5,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  getData(`http://localhost:8000/posts/file/${header}`).then((data) => {
    getBookmarks(header).then((bookmarks) => {
      const pdfFile = pdfjsLib.getDocument(data);
      resetCurrentPDF();
      pdfFile.promise.then((doc) => {
        currentPDF.file = doc;
        currentPDF.countOfPages = doc.numPages + 1;
        renderPrevPages(prevPages, headerPages, bookmarks);
      });
    });
  });
});

function renderPrevPages(parent, allpage, bookmarks) {
  var index = -1;
  for (let i = 0; i < currentPDF.countOfPages; i++) {
    currentPDF.file.getPage(i).then((page) => {
      var pageBX = document.createElement("div");
      pageBX.id = `pagebx-${i}`;
      pageBX.className = "pageBX";
      parent.appendChild(pageBX);
      var currentPageBX = document.querySelector(`#pagebx-${i}`);

      var pageItem = document.createElement("canvas");
      pageItem.id = `page-${i}`;
      pageItem.className = "prev-page";
      currentPageBX.appendChild(pageItem);
      var currentCanvas = document.querySelector(`#page-${i}`);

      var pageIndicator = document.createElement("div");
      pageIndicator.id = `pagei-${i}`;
      pageIndicator.className = "pageindicator";
      pageIndicator.setAttribute("data-page", i);
      currentPageBX.appendChild(pageIndicator);
      document.querySelector(`#pagei-${i}`).innerHTML = `${i}/${
        currentPDF.countOfPages - 1
      }`;

      var bookmark = document.createElement("div");
      bookmark.id = `bookmarki-${i}`;
	  if (bookmarks.includes(i)) (bookmark.className = "bookmark marked", renderBookMark(page, i));
      else bookmark.className = "bookmark";
      bookmark.setAttribute("data-page", i);
      currentPageBX.appendChild(bookmark);

      var context = currentCanvas.getContext("2d");
      var viewport = page.getViewport({ scale: currentPDF.zoom });
      currentCanvas.height = viewport.height;
      currentCanvas.width = viewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
    index++;
  }
  allpage.classList.remove("hidden");
  allpage.setAttribute("data-pages", index);
  allpage.innerHTML = `Pages: ${index}`;
}

function renderBookMark(page, i) {
	var pageBX = document.createElement("div");
	pageBX.id = `bookmark-pagebx-${i}`;
	pageBX.className = "pageBX";
	bookmarks.appendChild(pageBX);
	var currentPageBX = document.querySelector(`#bookmark-pagebx-${i}`);

	var bookMarkItem = document.createElement("canvas");
	bookMarkItem.id = `bookmark-page-${i}`;
	bookMarkItem.className = "prev-page";
	currentPageBX.appendChild(bookMarkItem);
	var currentBookmark = document.querySelector(`#bookmark-page-${i}`);

	var indexBX = document.createElement("div");
	indexBX.id = `indexBX-${i}`;
	indexBX.className = "indexBX-bookmarks";
	indexBX.setAttribute("data-pages", i);
	currentPageBX.appendChild(indexBX);
	document.querySelector(`#indexBX-${i}`).innerHTML = `${i}/${
	  currentPDF.countOfPages - 1
	}`;

	var context = currentBookmark.getContext("2d");
	var viewport = page.getViewport({ scale: currentPDF.zoom });
	currentBookmark.height = viewport.height;
	currentBookmark.width = viewport.width;

	var renderContext = {
	  canvasContext: context,
	  viewport: viewport,
	};
	page.render(renderContext);
}

async function getBookmarks(header) {
  try {
    const response = await getData(
      `http://localhost:8000/posts/bookmark/${header}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
