const genreItems = document.querySelectorAll('.genre_item');

genreItems.forEach(element => element.addEventListener('click', event => {
    handlegenreItem(element);
}));

function handlegenreItem(I) {
    var itemID = I.id,
        dataAttr = "data-genre";

    if (I.hasAttribute(dataAttr)) I.removeAttribute(dataAttr);
    else I.setAttribute(dataAttr, itemID);
}