// Utolsó görgetési pozíció
var lastScroll = 0;
// Kis méretűre összevonás jelzője
var shrink = ["shrinked"];
// Navbar és selectbar elemek osztálylistáinak lekérése
const navBarCl = document.querySelector('#navbar').classList;
const selectBarCl = document.querySelector('#selectbar').classList;
// Lábléc elem lekérése
const footbar = document.querySelector('.footbar');

// Görgetés eseménykezelője
window.addEventListener('scroll', event => {
    // Ha az ablak szélessége kisebb, mint 1200px, akkor végezzünk görgetési műveleteket
    if (window.innerWidth < 1200) scrollAct();
});

// Görgetési műveletek
function scrollAct() {
    // Aktuális görgetési pozíció lekérése
    var currScroll = window.scrollY;
    // Ha az aktuális görgetési pozíció nagyobb, mint az előző, akkor megjelenítés
    if (currScroll > lastScroll) scrollShow(true);
    // Ha az aktuális görgetési pozíció kisebb, mint az előző, akkor elrejtés
    else if (currScroll < lastScroll) scrollShow(false);
    // Az aktuális görgetési pozíció eltárolása
    lastScroll = currScroll <= 0 ? 0 : currScroll;
}

// Görgetés alapján való megjelenítés/elrejtés
function scrollShow(ch) {
    // Ha a görgetési irány felfelé van, akkor elemek megjelenítése
    // Ha a görgetési irány lefelé van, akkor elemek elrejtése
    ch == true ? (navBarCl.add(shrink), selectBarCl.add(shrink), clearClass(shrink, true), footbar.classList.add('op-6')) : (navBarCl.remove(shrink), selectBarCl.remove(shrink), clearClass(shrink, false), footbar.classList.remove('op-6'));
}

// Osztályok tisztítása
function clearClass(cl, add) {
    sideBT.forEach(sidebtElement => {
        cl.forEach(clName => {
            add == true ? sidebtElement.classList.add(clName) : sidebtElement.classList.remove(clName);
        });
    });
}