const thoughtsBT = document.querySelectorAll('.reeleInteractbutton_T');
const reeleBT = document.querySelectorAll('.reeleInteractbutton_R');
const reeleBTstatic = document.querySelector('#reeleBTstatic');
const clubProfile = document.querySelector('#clubProfile');
var reel = document.body.getAttribute('data-reele');

// Eseményfigyelő hozzáadása a dokumentumhoz
document.addEventListener("click", (event) => {
    // Ha a célelem osztályneve 'reeleInteractbutton_R'
    if (event.target.className == "reeleInteractbutton_R") reeleAction(event.target);
    // Ha a célelem osztályneve 'bookmark'
    if (event.target.className == "bookmark") bookMarkAction(event);
    // Ha a célelem id-je 'flagBTstatic'
    if (event.target.id == "flagBTstatic") flagAction(event.target);
    // Ha a célelem osztályneve 'bookmark marked'
    if (event.target.className == "bookmark marked") bookMarkAction(event);
    // Ha a célelem osztályneve 'reeleBookCover', átirányítás a megfelelő reele oldalra
    if (event.target.className == "reeleBookCover") redirect(`/reele/${event.target.getAttribute('data-reele')}`);
    // Ha a célelem osztályneve 'reele-mini-cover', átirányítás a megfelelő reele oldalra
    if (event.target.className == "reele-mini-cover") redirect(`/reele/${event.target.getAttribute('data-reele')}`);
    // Ha a célelem osztályneve 'clubItemLine', átirányítás a megfelelő kluboldalra
    if (event.target.className == "clubItemLine") redirect(`/club/${event.target.getAttribute('data-club')}`);
});

// Klubprofil eseményfigyelője
try {
    clubProfile.addEventListener("click", (event) => {
        // Átirányítás a megfelelő kluboldalra
        redirect(`/club/${event.target.getAttribute('data-club')}`);
    });
} catch {
    
}

// A bejegyzés jelentésére vonatkozó műveleteket végző függvény.
function flagAction(post) {
    let CurrStatusCode = null;
    // POST kérés küldése a bejegyzés jelentése céljából.
    postData(`http://localhost:8000/api/posts/flag/${post.getAttribute('data-post')}`, {})
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            // Ha a kérés sikeres volt (201-es státuszkód), akkor frissítjük a bejegyzés ikonját.
            if (CurrStatusCode == 201) {
                console.log(data);
                post.querySelector('.reeleInteractIcon').src = data.value;
            };
        });
}

// A reele műveleteket végző függvény.
function reeleAction(post) {
    let CurrStatusCode = null;
    // POST kérés küldése a reele művelet végrehajtásához.
    postData(`http://localhost:8000/api/posts/reele/${post.getAttribute('data-post')}`, {})
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            // Ha a kérés sikeres volt (201-es státuszkód), akkor frissítjük a reele ikonját és címét.
            if (CurrStatusCode == 201) {
                console.log(data);
                post.querySelector('.reeleInteractIcon').src = data.value;
                post.querySelector('.reeleInteracttitle').innerHTML = data.msg;
            };
        });
}

// A könyvjelzőzés műveleteket végző függvény.
function bookMarkAction(e) {
    let CurrStatusCode = null;
    // POST kérés küldése a könyvjelzőzés műveletéhez.
    postData(`http://localhost:8000/api/posts/bookmark/${reel}`, { page: e.target.getAttribute('data-page') })
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            // Ha a kérés sikeres volt (201-es státuszkód), akkor frissítjük a könyvjelző ikonját.
            if (CurrStatusCode == 201) {
                e.target.className = data.class;
            };
        });
}