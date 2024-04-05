const yourreeles = document.querySelector('#yourreeles');

// Felhasználó felületen megjelenítendő reelek tartalmának generálása
function generateMreele(data) {
    console.log(data)
    // Új reele elem létrehozása és formázása
    const newMreele = `
        <div class="reele-mini-item">
            <img src="http://192.168.0.143:8000/posts/cover/${data.documentname}" class="reele-mini-cover" data-reele="${data.documentname}">
            <p>${data.documentname}</p>
        </div>
        <span class="line-vertical-b"></span>
    `;

    yourreeles.innerHTML += newMreele;
}