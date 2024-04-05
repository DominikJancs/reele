const navIcon = document.querySelector('.navicon');
var CurrStatusCode = null;

// Eseménykezelő hozzáadása a navigációs ikonhoz
navIcon.addEventListener('click', event => {
    // Átirányítás a főoldalra
    redirect("/");
});

// Profilkép frissítésének aszinkron funkciója
async function upActIc(f) {
    // státuszkód nullázása
    CurrStatusCode = null;
    if (f) {
        return new Promise((resolve, reject) => {
            // Profilkép frissítése az API-n keresztül
            postForm('http://192.168.0.143:8000/api/ich', f)
                .then((response) => {
                    // státuszkód beállítása a válasz alapján
                    CurrStatusCode = response.status;
                    return response.json()
                }).then(data => {
                    // Státuszkód ellenőrzése, és a Promise megfelelő értékkel való feloldása
                    if (CurrStatusCode == 201) resolve(true);
                    else resolve(false);
                });
        });
    }
}

// Jelszó frissítésének aszinkron funkciója
async function upActPass(d) {
    // státuszkód nullázása
    CurrStatusCode = null;
    if (d) {
        // Új Promise létrehozása
        return new Promise((resolve, reject) => {
            // Jelszó frissítése az API-n keresztül
            postData('http://192.168.0.143:8000/api/pch', d)
                .then((response) => {
                    // státuszkód beállítása a válasz alapján
                    CurrStatusCode = response.status;
                    return response.json()
                }).then(data => {
                    // Státuszkód ellenőrzése, és a Promise megfelelő értékkel való feloldása
                    if (CurrStatusCode == 201) resolve(true);
                    else resolve(false);
                });
        });
    }
}

// Leírás frissítésének aszinkron funkciója
async function upActDes(d) {
    // státuszkód nullázása
    CurrStatusCode = null;
    if (d) {
        // Új Promise létrehozása
        return new Promise((resolve, reject) => {
            // Leírás frissítése az API-n keresztül
            postData('http://192.168.0.143:8000/api/des', d)
                .then((response) => {
                    // státuszkód beállítása a válasz alapján
                    CurrStatusCode = response.status;
                    return response.json()
                }).then(data => {
                    // Státuszkód ellenőrzése, és a Promise megfelelő értékkel való feloldása
                    if (CurrStatusCode == 201) resolve(true);
                    else resolve(false);
                });
        });
    }
}