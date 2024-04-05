const libraInp = document.querySelector('#libraInp'),
    remoLibBt = document.querySelector('#remoLibBt'),
    libras_bx = document.querySelector('#libras_bx');
var libra_counter = 1;

libraInp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        var libraVal = libraInp.value;
        chkLibra(libraVal);
    }
});

remoLibBt.addEventListener('click', () => {
    var libraItems = document.querySelectorAll('.libra_item');
    if (libraItems.length > 0) removeLibra(libraItems);
});

function chkLibra(val) {
    var chk_Libra = charaters(5, 16, val);
    if (chk_Libra) addLibra(val);
}

function addLibra(val) {
    var libraItem = document.createElement('div');
    libraItem.className = "libra_item";
    libraItem.setAttribute('data-libra', val)
    libras_bx.appendChild(libraItem);

    var libraTitle = document.createElement('label');
    libraTitle.innerHTML = `${libra_counter}#: ${val}`;
    libraItem.appendChild(libraTitle);
    libras_bx.scrollTop = libras_bx.scrollHeight;
    clearLibraInp();

    libra_counter++;
}

function removeLibra(libras) {
    var lastLibra = libras[libras.length-1];
    lastLibra.remove();

    libra_counter--;
}

function clearLibraInp() {
    libraInp.value = null;
}