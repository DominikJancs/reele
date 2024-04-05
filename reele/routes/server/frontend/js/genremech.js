// Összes műfaj elem lekérdezése
const genreItems = document.querySelectorAll('.genre_item');

// Műfaj elemekhez eseményfigyelő hozzáadása
genreItems.forEach(element => element.addEventListener('click', event => {
    // Kiválasztott bejegyzések eltávolítása és műfajelem kezelése
    (removePost(), handlegenreItem(element));
}));

// Műfajelem kezelése
function handlegenreItem(I) {
    var itemID = I.id,
        dataAttr = "data-genre";

        // Ellenőrzi, hogy az elem rendelkezik-e adat-műfaj attribútummal
    if (I.hasAttribute(dataAttr)) (I.removeAttribute(dataAttr), getAll());
    else (clearSearch(), I.setAttribute(dataAttr, itemID), genreSearch(I));
}

// Keresés törlése
function clearSearch() {
    // Ellenőrzi, hogy vannak-e műfajelemek
    if (genreItems) {
        // Minden műfajelemen végigmegy és eltávolítja az adat-műfaj attribútumot
        genreItems.forEach((element) => {
            element.removeAttribute('data-genre');
        });
    }
}