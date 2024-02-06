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
    ucProImg = document.querySelector('#user-profile'),
    replaceMsgTit = document.querySelector('#replaceMsgTit');
var file = null,
    isupan = false;

replaceIc.addEventListener('change', event => {
    profileCh(event);
});

acBtDe.addEventListener('click', () => {
    (setDefuPRo(), setProUrl({ blob: false, src: defucImgSrc }));
});

/* --async-- */
const acAc = async () => {
    if (isupan) var uplChk = await upActIc(file);
    if (uplChk) (replaceMsg("Updated ✓..."), setDefuPRo(), setProUrl({ blob: true, src: file }));
    else (replaceMsg("Error ✘..."), setDefuPRo(), setProUrl({ blob: false, src: defucImgSrc }));
}
/*----*/

acBtAc.addEventListener('click', acAc);

function profileCh(e) {
    var chkproinp = chkUpInp(e);
    if (chkproinp.chk) (replaceInt.style.visibility = "visible", replaceInt.style.height = "2.5rem", replaceInt.style.opacity = '1', replaceIcL.classList.add('vibrate'));
    else replaceMsg(chkproinp.msg);
}

function replaceMsg(msg) {
    (replaceInt.removeAttribute('style'),
        replaceMsgBx.classList.add('hoppon'),
        replaceMsgTit.innerText = msg,
        setTimeout(() => {
            replaceMsgBx.classList.remove('hoppon');
        }, 1000));
}

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

function checkImg(img) {
    const fileType = img.type, fileSize = img.size;

    if (fileSize > maxFileSize) return { chk: false, msg: "file size" };
    if (allowedExts.includes(fileType)) return { chk: true, msg: "" };
    else return { chk: false, msg: "file type" };
}