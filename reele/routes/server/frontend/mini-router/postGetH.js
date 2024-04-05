window.addEventListener('load', () => {
    (getAll(), yourReeles(), joinedClub(), top5club());
});


function genreSearch(e) {
    var genre = e.getAttribute('data-genre');

    get(`http://192.168.0.143:8000/api/posts/home/${genre}`).then((data) => {
        console.log(data)
        data.forEach(d => {
            generatePost(d);
        });
    });
}

function getAll() {
    get('http://192.168.0.143:8000/api/posts/home/all').then((data) => {
        data.forEach(d => {
            generatePost(d);
        });
    });
}

function yourReeles() {
    get('http://192.168.0.143:8000/api/yourreel/home').then((data) => {
        data.forEach(d => {
            generateMreele(d);
        });
    });
}