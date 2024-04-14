const joinBT = document.querySelector('#joinBT');

window.addEventListener('load', () => {
    get(`http://localhost:8000/api/club/join-get/${joinBT.getAttribute('data-club')}`).then((data) => {
        joinBT.innerHTML = data.value;
    });
});

joinBT.addEventListener('click', (e) => {
    clubJoin();
});

function clubJoin() {
    postData(`http://localhost:8000/api/club/join/${joinBT.getAttribute('data-club')}`, {})
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            if (CurrStatusCode == 201) {
                joinBT.innerHTML = data.value;
            };
        });
}