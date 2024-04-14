window.addEventListener('load', () => {
    (yourReeles(), joinedClub(), top5club());
});

function yourReeles() {
    get('http://localhost:8000/api/yourreel/home').then((data) => {
    data.forEach(d => {
            generateMreele(d);
        });
    });
}