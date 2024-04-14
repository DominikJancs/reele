const tabBar = document.querySelector('.tab-bar');

let isDragging = false

const Dragging = (e) => {
    if(!isDragging) return;
    tabBar.classList.add('dragged');
    tabBar.scrollLeft -= e.movementX;
}

const stopDragging = (e) => {
    tabBar.classList.remove('dragged');
    isDragging = false;
}

tabBar.addEventListener('mousedown', () => isDragging = true);
tabBar.addEventListener('mouseup', stopDragging);
tabBar.addEventListener('mousemove', Dragging)