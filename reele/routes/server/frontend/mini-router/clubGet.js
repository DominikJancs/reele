// Csatlakozott klubok lekérése és megjelenítése
function joinedClub() {
    // GET kérés elküldése a szervernek a csatlakozott klubok lekérésére
    get('http://192.168.0.143:8000/api/joined').then((data) => {
        // Minden klubra iterálva generáljuk a klub sorait az "joined" címkével
        data.forEach(d => {
            generateClubLine(d, "joined");
        });
    });
}

// Top 5 klub lekérése és megjelenítése
function top5club() {
    let count = 0;
    // GET kérés elküldése a szervernek a top 5 klub lekérésére
    get('http://192.168.0.143:8000/api/top5').then((data) => {
        // Minden klubra iterálva generáljuk a top 5 klub sorait a "top5" címkével, és számlálót növeljük
        data.forEach(d => {
            generateTop5(d, "top5", count);
            count++;
        });
    });
}