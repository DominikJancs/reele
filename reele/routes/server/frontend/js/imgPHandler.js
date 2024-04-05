// Maximális fájlméret
const maxFileSize = 2 * 1024 * 1024,
// Borító kép input mező lekérése
      pCoverInp = document.querySelector('#p_cover'),
      // Engedélyezett kiterjesztések
      allowedExts = [
    'image/jpg',
    'image/jpeg',
    'image/png'
];
// Borító kép elem lekérése
var pCover = document.querySelector('#post_cover'),
// Borító cím elem lekérése
    coverTitle = document.querySelector('#cover_title');

// Kép előnézet betöltése
pCoverInp.addEventListener("change", (event) => {
    // Fájl lekérése
    var file = event.target.files[0],
        msg = null,
        chkImg = checkImg(file).chk,
        chkMsg = checkImg(file).msg;

        // Ha a kép megfelel a feltételeknek
    if (chkImg) {
        // Borítókép beállítása és megfelelő formázása
        pCover.style.backgroundImage = "url("+URL.createObjectURL(file)+")";
        pCover.onload = function () {
            URL.revokeObjectURL(pCover.style.backgroundImage);
        }
        msg = "Correct ✓...";
        coverTitle.classList.add('hidden');
        $('#post_cover').css({ 'margin': '0', 'background-size': 'cover'});
    }
    else {
        // Ha a feltételek nem teljesülnek, hibaüzenet megjelenítése és alapértelmezett állapot visszaállítása
        msg = `Incorrect ${chkMsg} ✘...`;
        resetDefCo();
    }
    replaceMsg(msg);
});

// Alapértelmezett állapot visszaállítása
function resetDefCo() {
    pCover.removeAttribute('style');
    coverTitle.classList.remove('hidden');
    pCoverInp.value = null;
}

// Kép ellenőrzése
function checkImg(img) {
    const fileType = img.type;
    const fileSize = img.size;

    if (fileSize > maxFileSize) return {chk: false, msg: "file size"};
    if (allowedExts.includes(fileType)) return {chk: true, msg: ""};
    else return {chk: false, msg: "file type"};
}

// Üzenet cseréje
function replaceMsg(msg) {
    (replaceMsgBx.classList.add('hoppon'),
        replaceMsgTit.innerText = msg,
        setTimeout(() => {
            replaceMsgBx.classList.remove('hoppon');
        }, 1000));
}