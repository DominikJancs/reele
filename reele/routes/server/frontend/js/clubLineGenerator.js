// A HTML-ben megadott elemek lekérdezése az ID-jük alapján
const joinedClubs = document.querySelector('#joined-clubs'),
      top5Clubs = document.querySelector('#top5-clubs');

// Függvény az egyes klubok sorainak generálására
function generateClubLine(data, method) {
    // Új klub sor HTML kódja
    const newClubLine = `
    <div class="clubItemLine" data-club="${data.club}">
    <div class="clubItemBx">
        <div class="clubicon-mini"
            style='background-image: url("http://192.168.0.143:8000/c/clubprofiles/picture/${data.club}")'>
        </div>
        <p class="p">${data.club}</p>
    </div>
    </div>
    `;

    // Az új klub sor hozzáadása a megfelelő helyre a HTML-ben, az adott módszer alapján
    if (method == "joined") joinedClubs.innerHTML += newClubLine;
    else if (method == "top5") top5Clubs.innerHTML += newClubLine;
}

// Függvény a top 5 klubok generálására
function generateTop5(data, method, i) {
    // Díjak színének tömbje
    const awardColors = ['#B29600', '#696969', '#866000', '#FFFFFF', '#FFFFFF'];

    // Új klub sor HTML kódja a díjakkal
    const newClubLine = `
    <div class="clubItemLine" data-club="${data.club}">
    <div class="clubItemBx">
        <div class="clubicon-mini"
            style='background-image: url("http://192.168.0.143:8000/c/clubprofiles/picture/${data.club}")'>
        </div>
        <p class="p">${data.club}</p>
    </div>
    <div class="award-circle" style="background-color: ${awardColors[i]}"></div>
    `;

    // Az új klub sor hozzáadása a megfelelő helyre a HTML-ben, az adott módszer alapján
    if (method == "joined") joinedClubs.innerHTML += newClubLine;
    else if (method == "top5") top5Clubs.innerHTML += newClubLine;
}