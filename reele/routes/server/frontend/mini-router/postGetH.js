// Az összes szükséges adat betöltése az oldal betöltésekor
window.addEventListener('load', () => {
    (getAll(), yourReeles(), joinedClub(), top5club());
});

// Keresés a műfaj alapján
function genreSearch(e) {
    // A kiválasztott műfaj lekérése
    var genre = e.getAttribute('data-genre');

    // A megadott műfaj alapján a bejegyzések lekérése az otthoni oldalon
    get(`http://192.168.0.143:8000/api/posts/home/${genre}`).then((data) => {
        // Minden lekért bejegyzés megjelenítése
        console.log(data)
        data.forEach(d => {
            generatePost(d);
        });
    });
}

// Az összes bejegyzés lekérése és megjelenítése az otthoni oldalon
function getAll() {
    // Az összes bejegyzés lekérése az otthoni oldalon
    get('http://192.168.0.143:8000/api/posts/home/all').then((data) => {
    // Minden lekért bejegyzés megjelenítése    
    data.forEach(d => {
            generatePost(d);
        });
    });
}

// A felhasználó saját bejegyzéseinek lekérése és megjelenítése az otthoni oldalon
function yourReeles() {
    // A felhasználó saját bejegyzéseinek lekérése az otthoni oldalon
    get('http://192.168.0.143:8000/api/yourreel/home').then((data) => {
    // Minden lekért bejegyzés megjelenítése    
    data.forEach(d => {
            generateMreele(d);
        });
    });
}