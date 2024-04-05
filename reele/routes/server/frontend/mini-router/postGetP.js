// Az oldal betöltésekor az alábbi funkciók hívódnak meg: felhasználó saját bejegyzéseinek lekérése, csatlakozott klubok lekérése és a top 5 klub lekérése.
window.addEventListener('load', () => {
    (yourReeles(), joinedClub(), top5club());
});

// Felhasználó saját bejegyzéseinek lekérése és megjelenítése az otthoni oldalon
function yourReeles() {
    // Felhasználó saját bejegyzéseinek lekérése az otthoni oldalon
    get('http://192.168.0.143:8000/api/yourreel/home').then((data) => {
    // Minden lekért bejegyzés megjelenítése    
    data.forEach(d => {
            generateMreele(d);
        });
    });
}