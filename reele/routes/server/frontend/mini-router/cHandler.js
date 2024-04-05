const creCl = document.querySelector('#creCl'),
    genresLoc = [],
    librasLoc = [];

    // A klub létrehozásához szükséges adatok ellenőrzése
creCl.addEventListener('click', (e) => {
    // A klub létrehozásához szükséges adatok összegyűjtése
    var clubRawInf = {
        clubicon: document.querySelector('#c_icon'),
        clubbanner: document.querySelector('#c_banner'),
        clubname: document.querySelector('#clubname').value,
        genres: [...document.querySelectorAll('[data-genre]')],
        libras: [...document.querySelectorAll('.libra_item')],
        club_description: document.querySelector('#description_tb').value
    };
    // Klub adatok ellenőrzése
    var clubInfMsg = chkClubInf(clubRawInf);

    // Ha az adatok megfelelőek, akkor klub létrehozása
    if (clubInfMsg.value) createclub(clubRawInf);
    // Ellenkező esetben hibaüzenetek megjelenítése
    else dspCErr(clubInfMsg.err_code);
});

// Klub adatok ellenőrzése
function chkClubInf(clubInf) {
    var errLoc = [],
        errChk = true;

    // Név ellenőrzése
    if (clubInf.clubname.length == 0) (errChk = false, errLoc.push(1));
    // Műfajok ellenőrzése
    if (clubInf.genres.length < 2) (errChk = false, errLoc.push(2));
    // Könyvjelzők ellenőrzése
    if (clubInf.libras.length < 2 || clubInf.libras.length > 6) (errChk = false, errLoc.push(3));
    // Klubikon ellenőrzése
    if (clubInf.clubicon.value.length == 0) (errChk = false, errLoc.push(4));
    // Klub banner ellenőrzése
    if (clubInf.clubbanner.value.length == 0) (errChk = false, errLoc.push(5));
    // Klubikon és klub banner egyidejű ellenőrzése
    if (clubInf.clubicon.length == 0 && clubInf.clubbanner.length == 0) (errChk = false, errLoc.push(6));
    return { value: errChk, err_code: errLoc };
}

// Klub létrehozása
function createclub(Cdata) {
    var genreArr = [],
        libraArr = [];

    var CurrStatusCode = null;

    // Műfajok és könyvjelzők összegyűjtése
    Cdata.genres.forEach(genre => {
        genreArr.push(genre.getAttribute('data-genre'));
    });
    Cdata.libras.forEach(libra => {
        libraArr.push(libra.getAttribute('data-libra'));
    });

    // Klub adatainak összeállítása
    const clubdata = {
        clubname: Cdata.clubname,
        genres: genreArr,
        libras: libraArr,
        clubdesc: Cdata.club_description
    };

    // Klub adatok küldése a szervernek
    postData(`http://192.168.0.143:8000/api/create-club`, clubdata).then((response) => {
        CurrStatusCode = response.status;
        return response.json();
    })
        .then(data => {
            console.log(CurrStatusCode)
            switch (CurrStatusCode) {
                case 404:
                    // Nem található hiba kezelése...
                    break;
                case 201:
                    // Klubikon feltöltése
                    postDataForm('http://192.168.0.143:8000/api/upclubic', clubdata.clubname, Cdata.clubicon.files[0])
                        .then((response) => {
                            CurrStatusCode = response.status;
                            return response.json()
                        }).then(data => {
                            if (CurrStatusCode == 201) {
                                // Klub banner feltöltése
                                postDataForm('http://192.168.0.143:8000/api/upclubbanner', clubdata.clubname, Cdata.clubbanner.files[0])
                                    .then((response) => {
                                        CurrStatusCode = response.status;
                                        return response.json()
                                    }).then(data => {
                                        if (CurrStatusCode == 201) {
                                            // Sikeres klub létrehozás
                                        };
                                    });
                            };
                        });
                case 500:
                    // Szerver hiba kezelése...
                    break;
                default:
                    // Egyéb esetek kezelése...
                    break;
            }
        });
}

// Hibaüzenetek megjelenítése
function dspCErr(err) {
    // Elemek kiválasztása az oldalról
    var clubInp = document.querySelector('#clubname'),
        clubname_fav = document.querySelector('#clubname_fav'),
        genre_msg = document.querySelector('#genre-msg'),
        libra_msg = document.querySelector('#libra-msg'),
        imgTitle = document.querySelector('#imgTitle');

        // Hibaüzenetek megjelenítése az alapján, hogy milyen hibakódokat kapunk
    err.forEach(err_code => {
        switch (err_code) {
            case 1:
                // Ha a klubnév mező nincs kitöltve, akkor megjelenítjük a figyelmeztetést
                clubInp.setAttribute('placeholder', 'Please fill out this field...');
                clubname_fav.className = "fa-alert";
                break;
            case 2:
                // Ha kevesebb mint 2 műfaj van kiválasztva, akkor megváltoztatjuk a műfajok üzenetének színét
                genre_msg.style.color = 'var(--bright-red)'
                break;
            case 3:
                // Ha kevesebb mint 2 vagy több mint 6 könyvjelző van kiválasztva, akkor megváltoztatjuk a könyvjelzők üzenetének színét
                libra_msg.style.color = 'var(--bright-red)'
                break;
            case 4:
                // Ha nincs klub profilkép, akkor megjelenítjük az üzenetet
                imgTitle.innerHTML = "Please add a Club profile picture..."
                break;
            case 5:
                // Ha nincs klub banner, akkor megjelenítjük az üzenetet
                imgTitle.innerHTML = "Please add a Club banner..."
                break;
            case 6:
                // Ha nincs klub profilkép és klub banner, akkor megjelenítjük az üzenetet
                imgTitle.innerHTML = "Please add a Club profile and banner..."
                break;
            default:
                break;
        }
    });
}