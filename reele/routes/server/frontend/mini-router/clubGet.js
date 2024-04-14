function joinedClub() {
    get('http://localhost:8000/api/joined').then((data) => {
        data.forEach(d => {
            generateClubLine(d, "joined");
        });
    });
}

function top5club() {
    let count = 0;
    get('http://localhost:8000/api/top5').then((data) => {
        data.forEach(d => {
            generateTop5(d, "top5", count);
            count++;
        });
    });
}