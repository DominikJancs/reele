const interBT = document.querySelectorAll('.interact_bt');

// Állapot meghatározása
interBT.forEach(element => element.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.target.id;
    const targetCont = document.querySelector('.u_interact').id;

    // Cél és aktuális tartalom azonosítása
    if (targetId == targetCont) {
        // Útvonal kezelése
        catchroute(event, targetCont);
    }
    else if (targetId != targetCont) {
        // Kapcsolódás az adott célhoz
        toggleto(targetId);
    }
}));

function catchroute(e, route) {
    e.preventDefault();
    // Űrlap és ikon input kiválasztása
    let interForm = document.querySelector(`#${route}F`);
    let iconInp = document.querySelector('#u_icon');
    let formData = new FormData(interForm);

    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        form: route
    }

    //Frontend validációja
    var frValid = indicateUIreq(data);
    var CurrStatusCode = null;

    // Backend felé küldés
    if (frValid) {
        postData(`http://192.168.0.143:8000/api/${route}`, data)
            .then((response) => {
                CurrStatusCode = response.status;
                return response.json();
            })
            .then(data => {
                console.log(data);
                switch (CurrStatusCode) {
                    case 404:
                        // Felhasználói visszajelzés kezelése
                        indicateUIres(data);
                        break;
                    case 201:
                        // Válaszfeldolgozás
                        if (route == "signup" && iconInp.value.length > 0) /* Profilkép feltöltése */postForm('http://192.168.0.143:8000/api/ich', iconInp.files[0])
                            .then((response) => {
                                CurrStatusCode = response.status;
                                return response.json()
                            }).then(data => {
                                 // Visszairányítás
                                if (CurrStatusCode == 201) redirect("/");
                            });
                        else if (route == "signup" && iconInp.value.length == 0) redirect("/");
                        // Bejelentkezés utáni irányítás
                        else if (route == "login") redirect(data.name != null ? `/a/${data.name}` : "/");
                        break;
                    case 500:
                        // Szerverhiba kezelése...
                        break;
                    default:
                        break;
                }
            });
    }
}

window.catchroute = catchroute;