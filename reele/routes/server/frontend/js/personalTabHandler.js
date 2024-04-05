// Szerkesztés gomb elemek lekérése
const editBt = document.querySelectorAll('.editBt'),
// Szerkesztés jelzők elemek lekérése
    editSign = document.querySelectorAll('.editSign'),
    // Aláírás elemek lekérése
    sigEl = document.querySelectorAll('.sign_element'); 

    // Jelszóváltozás
var chpass = null,
// Jelenlegi jelszó
    currpass = null;

    // Szerkesztés gomb eseménykezelője
editBt.forEach(element => element.addEventListener('click', event => {
    // Aktuális elem beállítása
    setcurr(event.target);
}));

// Aktuális elem beállítása
function setcurr(target) {
    // Jelszókombináció beállítása
    var passcombo = { change: chpass, current: currpass };
    // Új jelszó értékének lekérése
    chpass = document.querySelector('#password').value,
    // Jelenlegi jelszó értékének lekérése
    currpass = document.querySelector('#subEditPassword').value;

    // Ha a gomb "cancelBt" osztállyal rendelkezik, akkor visszaállítás
    if (target.classList.contains("cancelBt")) {
        resetEditForm();
        return;
    }
    // Ellenkező esetben visszaállítás és szerkesztési művelet alkalmazása
    else (resetEditForm(), applyEditAction(target, passcombo));
}

// Űrlap visszaállítása
function resetEditForm() {
    // Aláírás elemek rejtése
    sigEl.forEach((element) => { element.classList.add('non_sign'); });
    // Szerkesztés jelzők visszaállítása
    editSign.forEach((element) => { element.innerText = "Edit"; });
    // Szerkesztés gombok állapotának visszaállítása
    editBt.forEach((element) => { element.classList.remove('cancelBt'); });
}

// Vágólapra másolás
function toclipboard() {
    // Ha biztonságos környezetben vagyunk, akkor vágólapra másolás
    if (window.isSecureContext) (showpasscopy.setAttribute('data-clipboard', chpass), showpasscopy.classList.remove('non_sign'));
}

// Szerkesztési művelet alkalmazása
async function applyEditAction(target, data) {
    switch (target.id) {
        case "editPass":
            // Mégse gomb hozzáadása
            addCancel(target)
            // Jelenlegi jelszó mező megjelenítése
            document.querySelector('#editPassCurr').classList.remove('non_sign');
            break;
        case "subeditPass":
            // Jelszó ellenőrzése
            var passChk = validPass(data.change);
            // Ha a jelszó érvényes, akkor művelet végrehajtása
            if (passChk) var passRes = await upActPass(data);
            // Ha a művelet sikeres, akkor vágólapra másolás és űrlap visszaállítása
            if (passRes) (toclipboard(), resetEditForm());
            // Hiba kezelése
            else /*Error handleing*/;
            break;
    }
}

// Mégse gomb hozzáadása
function addCancel(target) {
    (target.classList.add('cancelBt'), target.innerText = "✘");
}