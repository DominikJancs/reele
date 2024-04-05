const laClubs = document.querySelector('.la-clubs');

function generateFlagedClub(data) {

    console.log(data)

    const newFlagedClub = `
        <div class="club_itemBX">
        <div class="club_item" data-club="${data.clubID}">
        <div class="clubicon-mini"
            style='background-image: url("http://192.168.0.143:8000/c/clubprofiles/picture/${data.club}")'>
        </div>
        <p>${data.club}</p>
        <div class="line-mini"></div>
        <p>Has: ${data.flags}</p>
        <div class="la-flag-mini"></div>
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 800 200">
            <path class="stg1" d="M425.7,425.7L789.4,62.1c14.2-14.2,14.2-37.2,0-51.4c-14.2-14.2-37.2-14.2-51.4,0L400,348.6
        L62.1,10.7c-14.2-14.2-37.2-14.2-51.4,0C3.5,17.8,0,27.1,0,36.4S3.5,55,10.6,62.1l363.7,363.6c6.8,6.8,16.1,10.7,25.7,10.7
        C409.6,436.4,418.9,432.5,425.7,425.7z" />
            </svg>
        </div>
        <div id="club_post_${data.clubID}" class="club_posts"></div>
        </div>
    `;

    laClubs.innerHTML += newFlagedClub;
}