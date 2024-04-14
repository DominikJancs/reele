const pageIndex = document.querySelector('.page_index'),
    indexBX = document.querySelector('.indexBX'),
    indexCL = document.querySelector('.indexCL');

document.addEventListener("click", (event) => {
    if (event.target.className == "pageindicator") setPageIndex(event);
    if (event.target.className == "indexBX") scrollToPage(event.target.getAttribute('data-pages'));
    if (event.target.className == "indexBX-bookmarks") scrollToPage(event.target.getAttribute('data-pages'));
});

indexCL.addEventListener("click", (event) => {
    setDefPageIndex();
});

function setPageIndex(e) {
    var page = e.target.getAttribute('data-page'),
        content = e.target.textContent;

    pageIndex.classList.remove('hidden');
    indexBX.innerHTML = content;
    indexBX.setAttribute('data-pages', page);
    indexBX.scrollIntoView({
        behavior: 'smooth'
    });
}

function setDefPageIndex() {
    pageIndex.classList.add('hidden');
    indexBX.innerHTML = "";
    indexBX.setAttribute('data-pages', "0");
}

function scrollToPage(page) {
    const element = document.querySelector(`[data-page="${page}"]`),
        yOffset = 100,
        scrollY = element.getBoundingClientRect().top + window.pageYOffset - yOffset;

    window.scrollTo({ top: scrollY, behavior: 'smooth' });
}