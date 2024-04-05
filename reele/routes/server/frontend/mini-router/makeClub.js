const club = document.querySelector('.clubicon')

// Klub ikonra kattintás eseménykezelője
club.addEventListener('click', event => {
    console.log('clicked')
    // Átirányítás az "/create-club" oldalra
    redirect("/create-club");
});