const club = document.querySelector('.clubicon')

club.addEventListener('click', event => {
    console.log('clicked')
    redirect("/create-club");
});