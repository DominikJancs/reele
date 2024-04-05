// Tab-bar elem lekérése
const tabBar = document.querySelector('.tab-bar');

// Változó az egérmozgás követéséhez
let isDragging = false

// Egérmozgás eseménykezelő
const Dragging = (e) => {
    // Ha nem húzzuk az elemet, ne tegyen semmit
    if(!isDragging) return;
    // Tab-bar "dragged" osztályának hozzáadása
    tabBar.classList.add('dragged');
    // Tab-bar lapozása az egérmozgás irányába
    tabBar.scrollLeft -= e.movementX;
}

// Húzás befejezésének eseménykezelő
const stopDragging = (e) => {
    // Tab-bar "dragged" osztályának eltávolítása
    tabBar.classList.remove('dragged');
    // Húzás állapotának visszaállítása
    isDragging = false;
}

// Egérleütés eseménykezelő: húzás megkezdése
tabBar.addEventListener('mousedown', () => isDragging = true);
// Egér felengedésének eseménykezelő: húzás befejezése
tabBar.addEventListener('mouseup', stopDragging);
// Egérmozgás eseménykezelő: elem húzása
tabBar.addEventListener('mousemove', Dragging)