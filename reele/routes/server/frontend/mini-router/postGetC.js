// Az összes szükséges adat betöltése az oldal betöltésekor
window.addEventListener('load', () => {
    (getAll(), yourReeles(), joinedClub(), top5club());
});

// Keresés a műfaj alapján
function genreSearch(e) {
    // A kiválasztott műfaj lekérése
    var genre = e.getAttribute('data-genre');

    // A kiválasztott klubban található bejegyzések lekérése a megadott műfaj alapján
    get(`http://192.168.0.143:8000/api/posts/${joinBT.getAttribute('data-club')}/${genre}`).then((data) => {
        console.log(data)
        // Minden lekért bejegyzés megjelenítése
        data.forEach(d => {
            generatePost(d);
        });
    });
}

// Az összes bejegyzés lekérése és megjelenítése
function getAll() {
    // Az összes bejegyzés lekérése a klubban
    get(`http://192.168.0.143:8000/api/posts/${joinBT.getAttribute('data-club')}/all`).then((data) => {
        console.log(data)
        // Minden lekért bejegyzés megjelenítése
        data.forEach(d => {
            generatePost(d);
        });
    });
}

// A felhasználó saját bejegyzéseinek lekérése és megjelenítése
function yourReeles() {
    // A felhasználó saját bejegyzéseinek lekérése a klubban
    get(`http://192.168.0.143:8000/api/yourreel/${joinBT.getAttribute('data-club')}`).then((data) => {
    // Minden lekért bejegyzés megjelenítése    
    data.forEach(d => {
            generateMreele(d);
        });
    });
}