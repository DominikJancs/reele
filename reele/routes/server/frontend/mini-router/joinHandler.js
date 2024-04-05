const joinBT = document.querySelector('#joinBT');

// Oldal betöltésekor lekérése az adatnak, hogy megnézzük, hogy csatlakozhat-e
window.addEventListener('load', () => {
    // Csatlakozás gomb HTML tartalmának beállítása a szerver által visszaadott értékre
    get(`http://192.168.0.143:8000/api/club/join-get/${joinBT.getAttribute('data-club')}`).then((data) => {
        joinBT.innerHTML = data.value;
    });
});

// Csatlakozás gombra kattintás eseménykezelője
joinBT.addEventListener('click', (e) => {
    clubJoin();
});

// Klubhoz csatlakozás függvény
function clubJoin() {
    // Adatküldés a szervernek a csatlakozásról
    postData(`http://192.168.0.143:8000/api/club/join/${joinBT.getAttribute('data-club')}`, {})
        .then((response) => {
            // Válaszkód kezelése
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            // Ha a válaszkód 201, frissítjük a csatlakozás gomb HTML tartalmát a szerver által visszaadott értékre
            if (CurrStatusCode == 201) {
                joinBT.innerHTML = data.value;
            };
        });
}