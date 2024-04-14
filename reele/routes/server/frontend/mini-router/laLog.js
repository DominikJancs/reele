const laLogo = document.querySelector('#la-logo');
const exit = document.querySelector('#exit');

laLogo.addEventListener('click', event => {
    redirect("/");
});

exit.addEventListener('click', event => {
    get("http://localhost:8000/api/exit").then((data) => {
        if(data.success) redirect("/");
    });
});