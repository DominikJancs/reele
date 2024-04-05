const maxFileSize = 2 * 1024 * 1024,
    uIconInp = document.querySelector('#u_icon'),
    allowedExts = [
        'image/jpg',
        'image/jpeg',
        'image/png'
    ],
    replaceMsgBx = document.querySelector('#replaceMsgBx'),
    acBtDe = document.querySelector('#acBtDe'),
    acBtAc = document.querySelector('#acBtAc'),
    acBtCb = document.querySelector('#acBtCb'),
    acBtDes = document.querySelector('#acBtDes'),
    showpasscopy = document.querySelector('#showpasscopy'),
    ucProImg = document.querySelector('#user-profile'),
    replaceMsgTit = document.querySelector('#replaceMsgTit');
var file = null,
    isupan = false;

    // Képfeltöltés eseményfigyelő
replaceIc.addEventListener('change', event => {
    profileCh(event);
});

// Képfeltöltés eseményfigyelő
acBtDe.addEventListener('click', () => {
    (setDefuPRo(), setProUrl({ blob: false, src: defucImgSrc }));
});

/* --async-- */
// Profilkép aktualizálása gomb eseményfigyelője
const acAc = async () => {
    if (isupan) var uplChk = await upActIc(file);
    if (uplChk) (replaceMsg("Updated ✓..."), setDefuPRo(), setProUrl({ blob: true, src: file }));
    else (replaceMsg("Error ✘..."), setDefuPRo(), setProUrl({ blob: false, src: defucImgSrc }));
}

// Jelszó másolása vágólapra gomb eseményfigyelője
const acBc = async () => {
    await navigator.clipboard.writeText(showpasscopy.getAttribute('data-clipboard').value);
    console.log(showpasscopy.getAttribute('data-clipboard').value)
    showpasscopy.removeAttribute('data-clipboard');
}

// Leírás frissítése gomb eseményfigyelője
const acDes = async () => {
    var descript = document.querySelector('#description_tb').value;
    var chkCh = charaters(5, 255, descript);
    if (chkCh) var uplChk = await upActDes({descript: descript});
    if (uplChk) ;
    else ;
}
/*----*/

// Gombok eseményfigyelői
acBtAc.addEventListener('click', acAc);

acBtCb.addEventListener('click', acBc);

acBtDes.addEventListener('click', acDes);

// Profilkép változtatása eseményfigyelő
function profileCh(e) {
    var chkproinp = chkUpInp(e);
    if (chkproinp.chk) (replaceInt.style.visibility = "visible", replaceInt.style.height = "2.5rem", replaceInt.style.opacity = '1', replaceIcL.classList.add('vibrate'));
    else replaceMsg(chkproinp.msg);
}

// Üzenet cseréje
function replaceMsg(msg) {
    (replaceInt.removeAttribute('style'),
        replaceMsgBx.classList.add('hoppon'),
        replaceMsgTit.innerText = msg,
        setTimeout(() => {
            replaceMsgBx.classList.remove('hoppon');
        }, 1000));
}

// Profilkép ellenőrzése
function chkUpInp(e) {
    file = e.target.files[0];
    const chkImg = checkImg(file);

    if (chkImg.chk) {
        (isupan = true, loadBlob(file));
        return { chk: true, msg: "" };
    }
    else {
        (isupan = false, setDefuPRo(), setProUrl({ blob: false, src: defucImgSrc }));
        return { chk: false, msg: `${chkImg.msg} ✘...` };
    }
}

// Kép ellenőrzése
function checkImg(img) {
    const fileType = img.type, fileSize = img.size;

    if (fileSize > maxFileSize) return { chk: false, msg: "file size" };
    if (allowedExts.includes(fileType)) return { chk: true, msg: "" };
    else return { chk: false, msg: "file type" };
}