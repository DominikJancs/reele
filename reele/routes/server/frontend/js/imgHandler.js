const maxFileSize = 2 * 1024 * 1024,
      uIconInp = document.querySelector('#u_icon'),
      allowedExts = [
    'image/jpg',
    'image/jpeg',
    'image/png'
];

// Load preview image
uIconInp.addEventListener("change", (event) => {
    const imgTit = document.querySelector('#u_icon_tit');
    var file = event.target.files[0],
        ucIcoImg = document.querySelector('#ucico_img'),
        chkImg = checkImg(file).chk,
        chkMsg = checkImg(file).msg;

    if (chkImg) {
        ucIcoImg.src = URL.createObjectURL(file);
        ucIcoImg.onload = function () {
            URL.revokeObjectURL(ucIcoImg.src);
        }
        imgTit.innerText = "Correct ✓...";
        $('#ucico_img').css({ 'margin': '0', 'width': '4.3rem', 'height': '4.3rem', 'vertical-align': 'middle', 'border-radius': '50%', 'border': '3px solid #ffffffe3', 'object-fit': 'cover', 'object-position': 'center center;' });
    }
    else {
        imgTit.innerText = `Incorrect ${chkMsg} ✘...`;
        resetImg();
    }
});

function checkImg(img) {
    const fileType = img.type;
    const fileSize = img.size;

    if (fileSize > maxFileSize) return {chk: false, msg: "file size"};
    if (allowedExts.includes(fileType)) return {chk: true, msg: ""};
    else return {chk: false, msg: "file type"};
}