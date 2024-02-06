const interBT = document.querySelectorAll('.interact_bt');

interBT.forEach(element => element.addEventListener('click', event => {
    setActive(event.target.id)
}));

function setActive(btId) {
    document.querySelector('[data_selected_bt="active"]').removeAttribute('data_selected_bt');
    document.querySelector(`#${btId}`).setAttribute('data_selected_bt', 'active');
}