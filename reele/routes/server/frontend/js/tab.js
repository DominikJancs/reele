const interBT = document.querySelectorAll('.interact_bt');

// Az interakciós gombokhoz hozzáadott eseményfigyelők
interBT.forEach(element => element.addEventListener('click', event => {
    setActive(event.target.id)
}));

// Aktív gomb beállítása
function setActive(btId) {
    // Az aktív gomb kijelölése az adatattribútum alapján
    document.querySelector('[data_selected_bt="active"]').removeAttribute('data_selected_bt');
    document.querySelector(`#${btId}`).setAttribute('data_selected_bt', 'active');
}