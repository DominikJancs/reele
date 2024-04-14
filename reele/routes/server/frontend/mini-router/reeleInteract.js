const thoughtsBT = document.querySelectorAll('.reeleInteractbutton_T');
const reeleBT = document.querySelectorAll('.reeleInteractbutton_R');
const reeleBTstatic = document.querySelector('#reeleBTstatic');
const clubProfile = document.querySelector('#clubProfile');
var reel = document.body.getAttribute('data-reele');

document.addEventListener("click", (event) => {
    if (event.target.className == "reeleInteractbutton_R") reeleAction(event.target);
    if (event.target.className == "bookmark") bookMarkAction(event);
    if (event.target.id == "flagBTstatic") flagAction(event.target);
    if (event.target.className == "bookmark marked") bookMarkAction(event);
    if (event.target.className == "reeleBookCover") redirect(`/reele/${event.target.getAttribute('data-reele')}`);
    if (event.target.className == "reele-mini-cover") redirect(`/reele/${event.target.getAttribute('data-reele')}`);
    if (event.target.className == "clubItemLine") redirect(`/club/${event.target.getAttribute('data-club')}`);
});

try {
    clubProfile.addEventListener("click", (event) => {
        redirect(`/club/${event.target.getAttribute('data-club')}`);
    });
} catch {
    
}

function flagAction(post) {
    let CurrStatusCode = null;
    postData(`http://localhost:8000/api/posts/flag/${post.getAttribute('data-post')}`, {})
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            if (CurrStatusCode == 201) {
                console.log(data);
                post.querySelector('.reeleInteractIcon').src = data.value;
            };
        });
}

function reeleAction(post) {
    let CurrStatusCode = null;
    postData(`http://localhost:8000/api/posts/reele/${post.getAttribute('data-post')}`, {})
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            if (CurrStatusCode == 201) {
                console.log(data);
                post.querySelector('.reeleInteractIcon').src = data.value;
                post.querySelector('.reeleInteracttitle').innerHTML = data.msg;
            };
        });
}

function bookMarkAction(e) {
    let CurrStatusCode = null;
    postData(`http://localhost:8000/api/posts/bookmark/${reel}`, { page: e.target.getAttribute('data-page') })
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            if (CurrStatusCode == 201) {
                e.target.className = data.class;
            };
        });
}