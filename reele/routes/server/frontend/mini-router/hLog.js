const listLogout = document.querySelector('#list-logout'),
listProfile = document.querySelector('#list-profile');

// Profil menüpont kattintás eseménykezelője
listProfile.addEventListener('click', event => {
    // Átirányítás a felhasználó profil oldalára
    redirect("/profile/");
});

// Kijelentkezés menüpont kattintás eseménykezelője
listLogout.addEventListener('click', event => {
    // Kijelentkezési API hívás
    get("http://192.168.0.143:8000/api/logout").then((data) => {
        // Ellenőrzés, hogy a kijelentkezés sikeres volt-e
        if(data.success) redirect("/"); // Ha sikeres, átirányítás a főoldalra
    });
});