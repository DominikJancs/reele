const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

function indicateUIreq(indi) {
    var checkReq = true
    if (indi.form === "signup") checkReq = indicateSignreq(indi);
    if (indi.form === "login") checkReq = indicateLogreq(indi);
    return checkReq;
}

function indicateSignreq(data) {
    let checkInd = true;
    checkInd = emailPassValid(data);
    if (data.password !== data.confirmPassword) {
        password.value = confirmPassword.value = "";
        password.placeholder = confirmPassword.placeholder = "Passwords do not match..";
        document.querySelector(`#password-fav`).className = document.querySelector(`#confirmPassword-fav`).className = 'fa-alert';
        checkInd = false;
    }
    checkInd = inpEmptyCheck(data);
    return checkInd;
}

function indicateLogreq(data) {
    var subData = {...data};
    delete subData.username;
    delete subData.confirmPassword;
    let checkInd = true;
    checkInd = emailPassValid(subData);
    checkInd = inpEmptyCheck(subData);
    return checkInd;
}

function emailPassValid(data) {
    let checkV = true
    var validateMail = validmail(data.email);
    var validatePass = validPass(data.password);
    if (!validateMail) {
        email.value = "";
        email.placeholder = "Enter a valid email...";
        document.querySelector(`#email-fav`).className = 'fa-alert';
        checkV = false;
    }
    if (!validatePass) {
        password.value = confirmPassword.value = "";
        password.placeholder = confirmPassword.placeholder = "Symbol, Upper-Lower case, Number";
        document.querySelector(`#password-fav`).className = document.querySelector(`#confirmPassword-fav`).className = 'fa-alert';
        checkV = false;
    }
    if (data.password.length < 6 || data.password.length > 30) {
        password.value = "";
        password.placeholder = "6 to 30 character are required...";
        document.querySelector(`#password-fav`).className = 'fa-alert';
        checkV = false;
    }
    return checkV;
}

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

function indicateUIres(indi) {
    for (const [key, value] of Object.entries(indi)) {
        if (!value) continue;
        document.querySelector(`#${key}`).value = "";
        document.querySelector(`#${key}`).placeholder = value;
        document.querySelector(`#${key}-fav`).className = 'fa-alert';
    }
}   