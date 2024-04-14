const maxFileSize = 2 * 1024 * 1024,
      pCoverInp = document.querySelector('#p_cover'),
      allowedExts = [
    'image/jpg',
    'image/jpeg',
    'image/png'
];
var pCover = document.querySelector('#post_cover'),
    coverTitle = document.querySelector('#cover_title');

pCoverInp.addEventListener("change", (event) => {
    var file = event.target.files[0],
        msg = null,
        chkImg = checkImg(file).chk,
        chkMsg = checkImg(file).msg;

    if (chkImg) {
        pCover.style.backgroundImage = "url("+URL.createObjectURL(file)+")";
        pCover.onload = function () {
            URL.revokeObjectURL(pCover.style.backgroundImage);
        }
        msg = "Correct ✓...";
        coverTitle.classList.add('hidden');
        $('#post_cover').css({ 'margin': '0', 'background-size': 'cover'});
    }
    else {
        msg = `Incorrect ${chkMsg} ✘...`;
        resetDefCo();
    }
    replaceMsg(msg);
});

function resetDefCo() {
    pCover.removeAttribute('style');
    coverTitle.classList.remove('hidden');
    pCoverInp.value = null;
}

function checkImg(img) {
    const fileType = img.type;
    const fileSize = img.size;

    if (fileSize > maxFileSize) return {chk: false, msg: "file size"};
    if (allowedExts.includes(fileType)) return {chk: true, msg: ""};
    else return {chk: false, msg: "file type"};
}

function replaceMsg(msg) {
    (replaceMsgBx.classList.add('hoppon'),
        replaceMsgTit.innerText = msg,
        setTimeout(() => {
            replaceMsgBx.classList.remove('hoppon');
        }, 1000));
}