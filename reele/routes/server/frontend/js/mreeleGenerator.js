const yourreeles = document.querySelector('#yourreeles');

function generateMreele(data) {
    console.log(data)
    const newMreele = `
        <div class="reele-mini-item">
            <img src="http://192.168.0.143:8000/posts/cover/${data.documentname}" class="reele-mini-cover" data-reele="${data.documentname}">
            <p>${data.documentname}</p>
        </div>
        <span class="line-vertical-b"></span>
    `;

    yourreeles.innerHTML += newMreele;
}