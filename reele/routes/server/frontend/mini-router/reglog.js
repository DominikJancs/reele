const signup = document.querySelector('#list-signup'),
      login = document.querySelector('#list-login');

// Regisztráció gomb eseményfigyelője
signup.addEventListener('click', event => {
    // Átirányítás a regisztrációs oldalra
    redirect("/u/signup");
});

// Bejelentkezés gomb eseményfigyelője
login.addEventListener('click', event => {
    // Átirányítás a bejelentkezési oldalra
    redirect("/u/login");
});