const pageIndex = document.querySelector('.page_index'),
    indexBX = document.querySelector('.indexBX'),
    indexCL = document.querySelector('.indexCL');

    // Oldaljelző, oldalszám elemek és visszaállító gomb eseménykezelése
document.addEventListener("click", (event) => {
    // Ha a kattintás egy oldalszámjelzőre történik, akkor az oldaljelző beállítása
    if (event.target.className == "pageindicator") setPageIndex(event);
        // Ha a kattintás egy oldalszám elemre történik, akkor az adott oldalra való görgetés
    if (event.target.className == "indexBX") scrollToPage(event.target.getAttribute('data-pages'));
     // Ha a kattintás egy könyvjelző oldalszám elemre történik, akkor az adott oldalra való görgetés
    if (event.target.className == "indexBX-bookmarks") scrollToPage(event.target.getAttribute('data-pages'));
});

// Alapértelmezett oldalszám beállítása eseménykezelése
indexCL.addEventListener("click", (event) => {
    // Alapértelmezett oldalszám beállítása
    setDefPageIndex();
});

// Oldaljelző beállítása és görgetése az oldal megfelelő részére

function setPageIndex(e) {
    // Az oldalszámnak és a tartalomnak a kinyerése
    var page = e.target.getAttribute('data-page'),
        content = e.target.textContent;

        // Oldaljelző elrejtése és beállítása az új oldalszámra és tartalomra
    pageIndex.classList.remove('hidden');
    indexBX.innerHTML = content;
    indexBX.setAttribute('data-pages', page);
    // Az oldalszámhoz gördítés sima animációval
    indexBX.scrollIntoView({
        behavior: 'smooth'
    });
}

// Alapértelmezett oldaljelző beállítása
function setDefPageIndex() {
    // Oldaljelző elrejtése és alapértelmezett értékek beállítása
    pageIndex.classList.add('hidden');
    indexBX.innerHTML = "";
    indexBX.setAttribute('data-pages', "0");
}

// Az oldalra görgetés a megadott oldalszámhoz
function scrollToPage(page) {
    // A megadott oldalszámhoz tartozó elem kiválasztása és a görgetés végrehajtása
    const element = document.querySelector(`[data-page="${page}"]`),
        yOffset = 100,
        scrollY = element.getBoundingClientRect().top + window.pageYOffset - yOffset;

    window.scrollTo({ top: scrollY, behavior: 'smooth' });
}