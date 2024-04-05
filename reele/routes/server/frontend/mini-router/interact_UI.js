const sendBT = document.querySelector('#sendbt');
const uIcon = document.querySelector('#u_icon');
const profileDefault = document.querySelector('#ucico_img');

// Átkapcsolás a megfelelő helyre
function toggleto(btId) {
    // Beállítások törlése
    clearValues();
    // Profilkép visszaállítása
    resetImg();
    // Alapértelmezett értékek beállítása
    setDefault();
    // Aktív gomb eltávolítása
    document.querySelector('[data_selected_bt="active"]').removeAttribute('data_selected_bt');
    // Kiválasztott gomb beállítása aktívnak
    document.querySelector(`#${btId}`).setAttribute('data_selected_bt', 'active');
    // Profilkép címe beállítása
    document.querySelector('#u_icon_tit').innerText = "Profile picture (Optional)";
    // Cél elemek kiválasztása
    const targetId = btId;
    const targetCont = document.querySelector('.u_interact');
    const targetTit = document.querySelector('#interact_tit');
    const signElements = document.querySelectorAll('.sign_element');
    const sendBox = document.querySelector('#btBox');
    const interForm = document.querySelector('.interForm');

    // Cél azonosítójának alapján kapcsolás
    switch (targetId) {
        case "login":
            // Bejelentkezési felület beállítása
            targetCont.id = "login";
            interForm.id = "loginF";
            targetTit.innerText = "Log in";
            document.title = ".reele - log in";
            targetCont.setAttribute("data_interact_state", "log")
            document.querySelector('.log_element').classList.remove("non_log");

            // Regisztrációs elemek eltávolítása
            signElements.forEach(function (signElement) {
                signElement.classList.add("non_sign");
            });
            break;
        case "signup":
            // Regisztrációs felület beállítása
            targetCont.id = "signup";
            interForm.id = "signupF";
            targetTit.innerText = "Sign Up";
            document.title = ".reele - sign up";
            targetCont.setAttribute("data_interact_state", "sign")
            document.querySelector('.log_element').classList.add("non_log");
            // Küldés gomb elrejtése
            sendBox.setAttribute('style', 'width: 0; margin: 0');

            // Regisztrációs elemek megjelenítése
            signElements.forEach(function (signElement) {
                signElement.classList.remove("non_sign");
            });
            break;
        default:
            break;
    }
}

// Mezők üressé tétele
function clearValues() {
    var clearInps = document.querySelectorAll('input');
    clearInps.forEach(function (clearInput) {
        clearInput.value = null;
    });
}

// Kép visszaállítása alapértelmezettre
function resetImg() {
    profileDefault.src = "../assets/add_uico.png";
    profileDefault.setAttribute('style', 'height: 3em; vertical-align: middle;');
    uIcon.value = null;
}

// Alapértelmezett értékek beállítása
function setDefault() {
    // Alapértelmezett értékek beállítása az input mezőkben és az ikonok stílusában
    (document.querySelector('#email').placeholder = "youremail@random.com", document.querySelector('#username').placeholder = "username", document.querySelector('#password').placeholder = "................", document.querySelector('#confirmPassword').placeholder = "................", document.querySelector('#email-fav').className = 'fa-mail', document.querySelector('#username-fav').className = 'fa-book', document.querySelector('#password-fav').className = 'fa-key', document.querySelector('#confirmPassword-fav').className = 'fa-key');
}

// Küldés gomb eseménykezelője
sendBT.addEventListener('click', () => {
    // Küldés gomb megjelenítése
    document.querySelector('#btBox').removeAttribute('style');
});