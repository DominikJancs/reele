window.addEventListener('load', () => {
    (yourReeles(), joinedClub(), top5club());
});

function yourReeles() {
    get('http://192.168.0.143:8000/api/yourreel/home').then((data) => {
        data.forEach(d => {
            generateMreele(d);
        });
    });
}