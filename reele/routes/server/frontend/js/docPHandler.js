const maxDFileSize = 2 * 1024 * 1024,
    upDocument = document.querySelector('#up_document'),
    upDocumenInp = document.querySelector('#p_document'),
    reader = new FileReader(),
    allowedDocExts = [
        'application/pdf',
    ];
    let preview = document.querySelector('#prev_page'),
    pageDisp = document.querySelector('#pageDisp');

upDocumenInp.addEventListener("change", (event) => {
    var file = event.target.files[0],
        msg = null,
        chk = checkDoc(file);

    if (chk.chk) {
        upDocument.innerHTML = chk.name;
        upDocument.style.backgroundColor = "green";
        reader.readAsDataURL(file);
        reader.onload = () => {
         loadOutPDF(reader.result, preview, pageDisp, upDocumenInp);
        }
    }
    else {
        upDocument.innerHTML = chk.msg;
        upDocument.style.backgroundColor = "var(--bright-red)";
        upDocumenInp.value = null;
    }
});

function checkDoc(doc) {
    const fileDType = doc.type;
    const fileDSize = doc.size;
    const fileDname = doc.name;

    if (fileDSize > maxDFileSize) return { chk: false, msg: "file size ✘...", name: fileDname };
    if (allowedDocExts.includes(fileDType)) return { chk: true, msg: "", name: fileDname };
    else return { chk: false, msg: "file type ✘...", name: fileDname };
}