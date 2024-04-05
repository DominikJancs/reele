// Súly input mező lekérése
const libraInp = document.querySelector('#libraInp'),
// Súly törlése gomb lekérése
    remoLibBt = document.querySelector('#remoLibBt'),
    // Súlyak doboza elem lekérése
    libras_bx = document.querySelector('#libras_bx');
    // Súly számláló
var libra_counter = 1;

// Enter lenyomás eseményfigyelője a súly input mezőn
libraInp.addEventListener('keypress', (e) => {
    // Ha az Enter gombot lenyomják
    if (e.key === 'Enter') {
        // Súly értékének lekérése
        var libraVal = libraInp.value;
        // Súly ellenőrzése
        chkLibra(libraVal);
    }
});

// Súly törlése gomb eseményfigyelője
remoLibBt.addEventListener('click', () => {
    // Súly elemek lekérése
    var libraItems = document.querySelectorAll('.libra_item');
    // Ha vannak súly elemek
    if (libraItems.length > 0) removeLibra(libraItems);
});

// Súly ellenőrzése
function chkLibra(val) {
    // Súly hosszának ellenőrzése
    var chk_Libra = charaters(5, 16, val);
    // Ha a súly érvényes, hozzáadja azt
    if (chk_Libra) addLibra(val);
}

// Súly hozzáadása
function addLibra(val) {
    // Új súly elem létrehozása
    var libraItem = document.createElement('div');
    libraItem.className = "libra_item";
    libraItem.setAttribute('data-libra', val)
    libras_bx.appendChild(libraItem);

    // Új súly címke létrehozása
    var libraTitle = document.createElement('label');
    libraTitle.innerHTML = `${libra_counter}#: ${val}`;
    libraItem.appendChild(libraTitle);
    // Az átkerülés a legújabb hozzáadott súlyhoz
    libras_bx.scrollTop = libras_bx.scrollHeight;
    // Súly input mező törlése
    clearLibraInp();

    libra_counter++;
}

// Utolsó súly eltávolítása
function removeLibra(libras) {
    var lastLibra = libras[libras.length-1];
    lastLibra.remove();

    libra_counter--;
}

// Súly input mező törlése
function clearLibraInp() {
    libraInp.value = null;
}