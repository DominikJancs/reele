const interBT = document.querySelectorAll('.interact_bt');
const tabs = document.querySelectorAll('.tab');
const replaceIcL = document.querySelector('#replaceIcL');
var userProfile = document.querySelector('#user-profile');
const replaceInt = document.querySelector('#replaceInt');
var defucImgSrc = document.querySelector('#user-profile').src;
const swapBubble = document.querySelector('.swap-bubble');
const replaceIc = document.querySelector('#replace_icon');

// Eseményfigyelők hozzáadása az interakciós gombokhoz
interBT.forEach(element => element.addEventListener('click', event => {
    (settab(event.target.id), setActive(event.target.id))
}));

// Aktív lap beállítása és megjelenítése
function settab(btId) {
    (clearTabs(), replaceIcL.removeAttribute('for'), setDefuPRo(), setProUrl({ blob: false, src: defucImgSrc }), swapBubble.classList.remove('visible-op'));

    switch (btId) {
        case "home-tab-bt":
            document.querySelector('#home-tab-content').classList.remove('hidden');
            break;
        case "themes-tab-bt":
            document.querySelector('#themes-tab-content').classList.remove('hidden');
            break;
        case "reeles-tab-bt":
            document.querySelector('#reeles-tab-content').classList.remove('hidden');
            break;
        case "personal-tab-bt":
            replaceIcL.setAttribute('for', 'replace_icon');
            swapBubble.classList.add('visible-op');
            document.querySelector('#personal-tab-content').classList.remove('hidden');
            break;
    }
}

// Alapértelmezett profilkép beállítása
function setDefuPRo() {
    replaceInt.removeAttribute('style');
    replaceIcL.classList.remove('vibrate');
    isupan = false;
    replaceIc.value = null;
}

// Profilkép URL beállítása
function setProUrl(srcUrl) {
    var tistp = new Date().getTime();
    if (srcUrl.blob) loadBlob(srcUrl.src);
    else userProfile.src = srcUrl.src + "?t=" + tistp;
}

// Blob betöltése
function loadBlob(blb) {
    userProfile.src = blb;
    ucProImg.src = URL.createObjectURL(blb);
    ucProImg.onload = function () {
        URL.revokeObjectURL(ucProImg.src);
    }
}

// Aktív gomb beállítása
function setActive(btId) {
    document.querySelector('[data_selected_bt="active"]').removeAttribute('data_selected_bt');
    document.querySelector(`#${btId}`).setAttribute('data_selected_bt', 'active');
}

// Laposztályok törlése
function clearTabs() {
    tabs.forEach((element) => {
        element.classList.add('hidden');
    });
}