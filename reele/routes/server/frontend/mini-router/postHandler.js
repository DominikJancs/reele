const clubD = document.querySelector('#genre_menu');
const publishBt = document.querySelector('#publish_post');

// Az oldal betöltésekor lekéri a klub műfajait és megjeleníti a megfelelő választási lehetőségeket a bejegyzés létrehozásához.
window.addEventListener('load', () => {
    get(`http://192.168.0.143:8000/api/clubgenres/${clubD.getAttribute('data-club')}`).then((data) => {
    // Minden klub műfajának hozzáadása a választási lehetőségekhez    
    data.forEach(d => {
            var genreItem = document.createElement('option');
            genreItem.text = d;
            genreItem.value = d;
            clubD.appendChild(genreItem);
        });
    });
});

// A "Közzététel" gombra kattintva a megadott adatok alapján létrehozza és közzéteszi a bejegyzést.
publishBt.addEventListener('click', (e) => {
    // Szükséges adatok lekérése a bejegyzés létrehozásához
    var genreopt = document.querySelector('#genre_menu'),
        postRawInf = {
            postcover: document.querySelector('#p_cover'),
            document: document.querySelector('#p_document'),
            pages: document.querySelector('#p_document').getAttribute('data-pages'),
            docname: document.querySelector('#documentumname').value,
            docby: document.querySelector('#by').value,
            genre: genreopt.options[genreopt.selectedIndex].text
        };
        // Ellenőrzi a bejegyzés létrehozásához szükséges adatok helyességét
    var postInfMsg = chkPostInf(postRawInf);

    // Ha a szükséges adatok helyesek, akkor létrehozza és közzéteszi a bejegyzést
    if (postInfMsg.value) createPost(postRawInf);
    else dspPErr(postInfMsg.err_code);
});

// A bejegyzés létrehozása és közzététele a megadott adatok alapján
function createPost(postInf) {
    // Bejegyzés adatok küldése a szervernek
    postDatasForm(`http://192.168.0.143:8000/api/club/new-post/${clubD.getAttribute('data-club')}`, [postInf.docname, postInf.docby, postInf.genre, postInf.pages], postInf.postcover.files[0], postInf.document.files[0])
    .then((response) => {
        CurrStatusCode = response.status;
        return response.json()
    }).then(data => {
        // Ha a bejegyzés létrehozása sikeres, további tevékenységeket végezhetünk
        if (CurrStatusCode == 201) {
            //
        };
    });
}

// Ellenőrzi a bejegyzés létrehozásához szükséges adatok helyességét
function chkPostInf(postInf) {
    var errLoc = [],
        errChk = true;
    console.log(postInf.genre);
    // Ellenőrzi a dokumentum nevének megadását
    if (postInf.docname.length == 0) (errChk = false, errLoc.push(1));
    // Ellenőrzi a műfaj kiválasztását
    if (postInf.genre == "Choose a genre...") (errChk = false, errLoc.push(2));
    // Ellenőrzi a borító feltöltését
    if (postInf.postcover.value.length == 0) (errChk = false, errLoc.push(3));
    // Ellenőrzi a dokumentum feltöltését
    if (postInf.document.value.length == 0) (errChk = false, errLoc.push(4));
    return { value: errChk, err_code: errLoc };
}

// A bejegyzés létrehozásánál fellépő hibák megjelenítése
function dspPErr(err) {
    var cover_title = document.querySelector('#cover_title'),
        up_document = document.querySelector('#up_document'),
        documentumname = document.querySelector('#documentumname'),
        documentumname_fav = document.querySelector('#documentumname-fav');

        // Az egyes hibakódok alapján megjeleníti a megfelelő hibaüzeneteket
    err.forEach(err_code => {
        switch (err_code) {
            case 1:
                documentumname.setAttribute('placeholder', 'Please fill out this field...');
                documentumname_fav.className = "fa-alert";
                break;
            case 2:
                clubD.style.backgroundColor = 'var(--bright-red)';
                break;
            case 3:
                cover_title.style.color = 'var(--bright-red)';
                cover_title.innerHTML = "Please upload a cover...";
                break;
            case 4:
                up_document.style.backgroundColor = 'var(--bright-red)';
                break;
            default:
                //
                break;
        }
    });
}