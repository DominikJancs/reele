window.addEventListener('load', () => {
    (getAll(), yourReeles(), joinedClub(), top5club());
});

function genreSearch(e) {
    var genre = e.getAttribute('data-genre');

    get(`http://localhost:8000/api/posts/${joinBT.getAttribute('data-club')}/${genre}`).then((data) => {
        console.log(data)
        data.forEach(d => {
            generatePost(d);
        });
    });
}

function getAll() {
    get(`http://localhost:8000/api/posts/${joinBT.getAttribute('data-club')}/all`).then((data) => {
        console.log(data)
        data.forEach(d => {
            generatePost(d);
        });
    });
}

function yourReeles() {
    get(`http://localhost:8000/api/yourreel/${joinBT.getAttribute('data-club')}`).then((data) => {
    data.forEach(d => {
            generateMreele(d);
        });
    });
}