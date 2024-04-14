var lastScroll = 0;
var shrink = ["shrinked"];
const navBarCl = document.querySelector('#navbar').classList;
const selectBarCl = document.querySelector('#selectbar').classList;
const footbar = document.querySelector('.footbar');

window.addEventListener('scroll', event => {
    if (window.innerWidth < 1200) scrollAct();
});

function scrollAct() {
    var currScroll = window.scrollY;
    if (currScroll > lastScroll) scrollShow(true);
    else if (currScroll < lastScroll) scrollShow(false);
    lastScroll = currScroll <= 0 ? 0 : currScroll;
}

function scrollShow(ch) {
    ch == true ? (navBarCl.add(shrink), selectBarCl.add(shrink), clearClass(shrink, true), footbar.classList.add('op-6')) : (navBarCl.remove(shrink), selectBarCl.remove(shrink), clearClass(shrink, false), footbar.classList.remove('op-6'));
}

function clearClass(cl, add) {
    sideBT.forEach(sidebtElement => {
        cl.forEach(clName => {
            add == true ? sidebtElement.classList.add(clName) : sidebtElement.classList.remove(clName);
        });
    });
}