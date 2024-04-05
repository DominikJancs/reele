// Email, jelszó és megerősített jelszó mezők lekérése
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

// UI követelmények jelzése
function indicateUIreq(indi) {
    var checkReq = true
    // Ha az űrlap a "signup", akkor jelzések az új regisztrációhoz
    if (indi.form === "signup") checkReq = indicateSignreq(indi);
    // Ha az űrlap a "login", akkor jelzések a bejelentkezéshez
    if (indi.form === "login") checkReq = indicateLogreq(indi);
    return checkReq;
}

// Regisztrációs űrlap követelményeinek jelzése
function indicateSignreq(data) {
    let checkInd = true;
        // Email és jelszó ellenőrzése
    checkInd = emailPassValid(data);
    // Jelszavak egyezőségének ellenőrzése
    if (data.password !== data.confirmPassword) {
        password.value = confirmPassword.value = "";
        password.placeholder = confirmPassword.placeholder = "Passwords do not match..";
        document.querySelector(`#password-fav`).className = document.querySelector(`#confirmPassword-fav`).className = 'fa-alert';
        checkInd = false;
    }
    // Üres mezők ellenőrzése
    checkInd = inpEmptyCheck(data);
    return checkInd;
}

// Bejelentkezési űrlap követelményeinek jelzése
function indicateLogreq(data) {
    var subData = {...data};
    delete subData.username;
    delete subData.confirmPassword;
    let checkInd = true;
    // Email és jelszó ellenőrzése
    checkInd = emailPassValid(subData);
    // Üres mezők ellenőrzése
    checkInd = inpEmptyCheck(subData);
    return checkInd;
}

// Email és jelszó validációja
function emailPassValid(data) {
    let checkV = true
    // Email validáció
    var validateMail = validmail(data.email);
    var validatePass = validPass(data.password);
    if (!validateMail) {
        email.value = "";
        email.placeholder = "Enter a valid email...";
        document.querySelector(`#email-fav`).className = 'fa-alert';
        checkV = false;
    }
    // Jelszó validáció
    if (!validatePass) {
        password.value = confirmPassword.value = "";
        password.placeholder = confirmPassword.placeholder = "Symbol, Upper-Lower case, Number";
        document.querySelector(`#password-fav`).className = document.querySelector(`#confirmPassword-fav`).className = 'fa-alert';
        checkV = false;
    }
    // Jelszó hosszának ellenőrzése
    if (data.password.length < 6 || data.password.length > 30) {
        password.value = "";
        password.placeholder = "6 to 30 character are required...";
        document.querySelector(`#password-fav`).className = 'fa-alert';
        checkV = false;
    }
    return checkV;
}

// Üres mezők ellenőrzése
function inpEmptyCheck(data) {
    let count = 0;
    for (const [key, value] of Object.entries(data)) {
        if (!value) {
            document.querySelector(`#${key}`).placeholder = "Please fill out this field...";
            document.querySelector(`#${key}-fav`).className = 'fa-alert';
            count++;
        }
    }
    if (count > 0) return false;
    return true;
}

// UI válasz jelzése
function indicateUIres(indi) {
    for (const [key, value] of Object.entries(indi)) {
        if (!value) continue;
        document.querySelector(`#${key}`).value = "";
        document.querySelector(`#${key}`).placeholder = value;
        document.querySelector(`#${key}-fav`).className = 'fa-alert';
    }
}   