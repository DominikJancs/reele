// Összes műfaj elem lekérdezése
const genreItems = document.querySelectorAll('.genre_item');

// Műfaj elemekhez eseményfigyelő hozzáadása
genreItems.forEach(element => element.addEventListener('click', event => {
    // Műfaj elem kezelése kattintás esetén
    handlegenreItem(element);
}));

// Műfaj elem kezelése
function handlegenreItem(I) {
    // Elem azonosítójának és adat-műfaj attribútumának meghatározása
    var itemID = I.id,
        dataAttr = "data-genre";

        // Ellenőrzi, hogy az elem rendelkezik-e adat-műfaj attribútummal
        // Ha igen, eltávolítja azt
    if (I.hasAttribute(dataAttr)) I.removeAttribute(dataAttr);
    // Ha nem, beállítja az elemhez az adat-műfaj attribútumot az elem azonosítójával
    else I.setAttribute(dataAttr, itemID);
}