const genreItems = document.querySelectorAll('.genre_item');

genreItems.forEach(element => element.addEventListener('click', event => {
    (removePost(), handlegenreItem(element));
}));

function handlegenreItem(I) {
    var itemID = I.id,
        dataAttr = "data-genre";

    if (I.hasAttribute(dataAttr)) (I.removeAttribute(dataAttr), getAll());
    else (clearSearch(), I.setAttribute(dataAttr, itemID), genreSearch(I));
}

function clearSearch() {
    if (genreItems) {
        genreItems.forEach((element) => {
            element.removeAttribute('data-genre');
        });
    }
}