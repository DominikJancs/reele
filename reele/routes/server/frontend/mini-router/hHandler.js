const logo = document.querySelector('#logo'),
      reele_create = document.querySelector('#list-reele');

      // Az "Új Reele létrehozása" gomb eseménykezelője
reele_create.addEventListener('click', event => {
    // A klub nevének lekérése az adat attribútumból
    var clubname = reele_create.getAttribute('data-club');
    console.log(clubname)
    // Átirányítás az új Reele létrehozásához a klub nevével
    redirect(`http://192.168.0.143:8000/post/${clubname}`);
});      

// Az oldal logójának kattintás eseménykezelője
logo.addEventListener('click', event => {
    // Főoldalra való átirányítás
    redirect("/");
});
