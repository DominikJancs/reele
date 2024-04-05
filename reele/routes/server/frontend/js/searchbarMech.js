const headbar = document.querySelector('#headbar');
const selectbar = document.querySelector('#selectbar');
const srchInp = document.querySelector('.srchinp');
const title = document.querySelector('#title');
const srchfor = document.querySelector('#srchfor');
const selectbtgroup = document.querySelector('.selectbtgroup');

// Keresőmező fókuszba lépése eseményfigyelő
srchInp.addEventListener("focus", (event) => {
    if (window.innerHeight > window.innerWidth) title.classList.add("shrink-h-element");
    (selectbar.classList.remove("shrink-v-element"), selectbtgroup.classList.remove('invisible'), srchfor.classList.remove('invisible'), selectbar.classList.add("shadow-bottom"));
});

// Dokumentum kattintás eseményfigyelő
document.addEventListener('click', event => {
    if (!headbar.contains(event.target)) (title.classList.remove("shrink-h-element"), selectbar.classList.add("shrink-v-element"), selectbtgroup.classList.add('invisible'), srchfor.classList.add('invisible'), selectbar.classList.remove("shadow-bottom"));
});