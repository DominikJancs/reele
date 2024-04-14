window.onload = () => {
    flagedClubs();
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains('club_item')) {
        var openclub = openClubItem(event.target);
        if (openclub) flagedPosts(event.target);
    } 
    if (event.target.classList.contains('club_item')) {
        var openclub = openClubItem(event.target);
        if (openclub) flagedPosts(event.target);
    } 
    if (event.target.className == "post-mini-item") redirect(`/reele/${event.target.getAttribute('data-post')}`);
    if (event.target.className == "post-mini-bt check") acceptAction(event.target.getAttribute('data-post'), "check");
    if (event.target.className == "post-mini-bt denial") acceptAction(event.target.getAttribute('data-post'), "denial");
    if (event.target.className == "post-mini-bt unaccept") unacceptAction(event.target.getAttribute('data-post'));
    if (event.target.className == "post-mini-bt accept") acceptMethod(event.target.getAttribute('data-post'), event.target.getAttribute('data-method'));
});

function flagedPosts(e) {
    get(`http://localhost:8000/api/flaged/posts/${e.getAttribute('data-club')}`).then((data) => {
        data.forEach(d => {
            generateFlagedPost(d, e.getAttribute('data-club'));
        });
    });
}

function flagedClubs() {
    get("http://localhost:8000/api/flaged/clubs").then((data) => {
        data.forEach(d => {
            generateFlagedClub(d);
        });
    });
}

function openClubItem(e) {
    let openClitem = "openClitem";

    if (e.classList.contains(openClitem)) {
        e.classList.remove(openClitem);
        e.querySelector('svg').style.transform = "scale(1, 1)";
        removePosts(e);
        return false;
    } else {
        e.classList.add(openClitem);
        e.querySelector('svg').style.transform = "scale(1, -1)";
        return true;
    }
}

function removePosts(e) {
    let postBX = document.querySelector(`#club_post_${e.getAttribute('data-club')}`);
    postBX.innerHTML = '';
}

function acceptAction(e, check) {
    var postMiniAction = document.querySelector(`#post-mini-action-${e}`);
    var postMiniTitle = document.querySelector(`#post-mini-title-${e}`);
    postMiniAction.classList.remove("la-closed-vertical");

    if (check == "check") {
        postMiniTitle.innerText = "Accept check?";
    }
    else if (check == "denial") {
        postMiniTitle.innerText = "Accept delete?";
    }

    document.querySelector(`#post-mini-accept-${e}`).setAttribute('data-method', check);
}

function unacceptAction(e, check) {
    var postMiniAction = document.querySelector(`#post-mini-action-${e}`);
    var postMiniTitle = document.querySelector(`#post-mini-title-${e}`);
    postMiniAction.classList.add("la-closed-vertical");
    postMiniTitle.innerText = "";
    document.querySelector(`#post-mini-accept-${e}`).setAttribute('data-method', '');
}

function acceptMethod(e, method) {
    var post_delete = document.querySelector(`.[data-post="${e}"]`);

    if (method == "check") {
        postData(`http://localhost:8000/api/flaged/check/${e}`, {})
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            if (CurrStatusCode == 201) (post_delete.remove(), resolve(true));
            else resolve(false);
        });
    }
    else if (method == "denial") {
        postData(`http://localhost:8000/api/flaged/delete/${e}`, {})
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            if (CurrStatusCode == 201) resolve(true);
            else resolve(false);
        });
    }
}
