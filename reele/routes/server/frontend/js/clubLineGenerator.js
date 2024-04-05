const joinedClubs = document.querySelector('#joined-clubs'),
      top5Clubs = document.querySelector('#top5-clubs');

function generateClubLine(data, method) {
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

    if (method == "joined") joinedClubs.innerHTML += newClubLine;
    else if (method == "top5") top5Clubs.innerHTML += newClubLine;
}

function generateTop5(data, method, i) {
    const awardColors = ['#B29600', '#696969', '#866000', '#FFFFFF', '#FFFFFF'];

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

    if (method == "joined") joinedClubs.innerHTML += newClubLine;
    else if (method == "top5") top5Clubs.innerHTML += newClubLine;
}