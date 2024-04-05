const laLogo = document.querySelector('#la-logo');
const exit = document.querySelector('#exit');

// logóra kattintás eseménykezelője
laLogo.addEventListener('click', event => {
    // Átirányítás a főoldalra
    redirect("/");
});

// Kilépés gombra kattintás eseménykezelője
exit.addEventListener('click', event => {
    // Kilépési kérés küldése a szervernek
    get("http://192.168.0.143:8000/api/exit").then((data) => {
        // Ha a kilépés sikeres volt, átirányítás a főoldalra
        if(data.success) redirect("/");
    });
});