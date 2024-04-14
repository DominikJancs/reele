const maxFileSize = 2 * 1024 * 1024,
      cIconInp = document.querySelector('#c_icon'),
      cBannerInp = document.querySelector('#c_banner'),
      allowedExts = [
    'image/jpg',
    'image/jpeg',
    'image/png'
];
var ucBanner = document.querySelector('#club_banner_bg'),
ucIcoImg = document.querySelector('#ccico_img');

cIconInp.addEventListener("change", (event) => {
    const imgTit = document.querySelector('#imgTitle');
    var file = event.target.files[0],
        chkImg = checkImg(file).chk,
        chkMsg = checkImg(file).msg;

    if (chkImg) {
        ucIcoImg.src = URL.createObjectURL(file);
        ucIcoImg.onload = function () {
            URL.revokeObjectURL(ucIcoImg.src);
        }
        imgTit.innerText = "Correct ✓...";
        $('#ccico_img').css({ 'margin': '0', 'width': '4.3rem', 'height': '4.3rem', 'vertical-align': 'middle', 'border-radius': '50%', 'border': '3px solid #ffffffe3', 'object-fit': 'cover', 'object-position': 'center center;' });
    }
    else {
        imgTit.innerText = `Incorrect ${chkMsg} ✘...`;
        resetDefCI();
    }
});

function checkImg(img) {
    const fileType = img.type;
    const fileSize = img.size;

    if (fileSize > maxFileSize) return {chk: false, msg: "file size"};
    if (allowedExts.includes(fileType)) return {chk: true, msg: ""};
    else return {chk: false, msg: "file type"};
}

cBannerInp.addEventListener("change", (event) => {
    const imgTit = document.querySelector('#imgTitle');
    var file = event.target.files[0],
        chkImg = checkImg(file).chk,
        chkMsg = checkImg(file).msg;

    if (chkImg) {
        ucBanner.style.backgroundImage = "url("+URL.createObjectURL(file)+")";
        ucBanner.onload = function () {
            URL.revokeObjectURL(ucBanner.style.backgroundImage);
        }
        imgTit.innerText = "Correct ✓...";
        $('#club_banner_bg').css({ 'margin': '0', 'background-size': 'cover', 'filter': 'blur(3px)'});
    }
    else {
        imgTit.innerText = `Incorrect ${chkMsg} ✘...`;
        resetDefCB();
    }
});

function resetDefCB() {
    ucBanner.removeAttribute('style');
    cBannerInp.value = null;
}

function resetDefCI() {
    ucIcoImg.src = "../assets/plus_group_photo.png";
    ucIcoImg.setAttribute('style', 'height: 3em; vertical-align: middle;');
    cIconInp.value = null;
}

function checkImg(img) {
    const fileType = img.type;
    const fileSize = img.size;

    if (fileSize > maxFileSize) return {chk: false, msg: "file size"};
    if (allowedExts.includes(fileType)) return {chk: true, msg: ""};
    else return {chk: false, msg: "file type"};
}