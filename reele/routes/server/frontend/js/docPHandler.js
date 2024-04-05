// Maximális dokumentum fájlméret
const maxDFileSize = 2 * 1024 * 1024,
// Dokumentum feltöltésért felelős HTML elemek lekérése
    upDocument = document.querySelector('#up_document'),
    upDocumenInp = document.querySelector('#p_document'),
    // FileReader objektum létrehozása
    reader = new FileReader(),
    // Engedélyezett dokumentum kiterjesztések
    allowedDocExts = [
        'application/pdf',
    ];
    // Előnézeti kép elem
    let preview = document.querySelector('#prev_page'),
    // Oldalak számát megjelenítő elem
    pageDisp = document.querySelector('#pageDisp');

    // Eseményfigyelő hozzáadása az input mezőhöz
upDocumenInp.addEventListener("change", (event) => {
    var file = event.target.files[0],
        msg = null,
        chk = checkDoc(file);

        // Dokumentum ellenőrzése
    if (chk.chk) {
         // Ha az ellenőrzés sikeres, megjelenítjük a dokumentum nevét és beállítjuk a háttérszínét zöldre
        upDocument.innerHTML = chk.name;
        upDocument.style.backgroundColor = "green";
        // Fájl beolvasása
        reader.readAsDataURL(file);
        // Beolvasás eseményfigyelője
        reader.onload = () => {
            // Beolvasott fájl feldolgozása és megjelenítése
         loadOutPDF(reader.result, preview, pageDisp, upDocumenInp);
        }
    }
    else {
        // Ha az ellenőrzés sikertelen, megjelenítjük a hibaüzenetet és beállítjuk a háttérszínét pirosra
        upDocument.innerHTML = chk.msg;
        upDocument.style.backgroundColor = "var(--bright-red)";
        // A kiválasztott fájl törlése
        upDocumenInp.value = null;
    }
});

// Dokumentum ellenőrzése
function checkDoc(doc) {
    const fileDType = doc.type;
    const fileDSize = doc.size;
    const fileDname = doc.name;

    // Méret ellenőrzése
    if (fileDSize > maxDFileSize) return { chk: false, msg: "file size ✘...", name: fileDname };
    // Kiterjesztés ellenőrzése
    if (allowedDocExts.includes(fileDType)) return { chk: true, msg: "", name: fileDname };
    else return { chk: false, msg: "file type ✘...", name: fileDname };
}