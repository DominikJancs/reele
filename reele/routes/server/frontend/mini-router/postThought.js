const sendThought = document.querySelector('#sendThought'),
    openThoughts = document.querySelector('#openThoughts'),
    currHeader = document.body.getAttribute('data-reele');
    var CurrStatusCode = null;

    // Az új gondolat elküldése gombra kattintva meghívja a gondolatok kezeléséért felelős függvényt.
sendThought.addEventListener('click', event => {
    thougtAction(event);
});

// Az "Open thoughts" gombra kattintva lekéri és megjeleníti az összes gondolatot.
openThoughts.addEventListener('click', event => {
    getThoughts(event);
});

// A gondolatok kezelését végző függvény.
function thougtAction(e) {
    // A gondolatot tartalmazó input elem kiválasztása.
    var curr_thought = document.querySelector('#thought_inp'),
        thoughtsContent = document.querySelector('.thoughts_content');
    thoughtsMsg = document.querySelector('#thoughts_msg');
    headerIndexes = document.querySelector('#header-pages').getAttribute('data-pages'),
        indexPages = document.querySelector('.indexBX').getAttribute('data-pages'),
        chk_index = chkPageIndex(indexPages, headerIndexes),
        chk_thought = charaters(5, 255, curr_thought.value);

    console.log(headerIndexes)

    // Ha a gondolat és az oldalindex helyes, elküldi a gondolatot a szervernek.
    if (chk_thought && chk_index) {
        var thoughtedMsg = document.querySelector('#thoughted_msg'),
            contextMsg = document.querySelector('#context_msg');

        postData(`http://192.168.0.143:8000/api/thought/${currHeader}`, { thought: curr_thought.value, pages: indexPages })
            .then((response) => {
                CurrStatusCode = response.status;
                return response.json()
            }).then(data => {
                // Ha a gondolat sikeresen elküldve, az oldal frissül.
                if (CurrStatusCode == 201) {
                    console.log(data);
                    setDefPageIndex();
                    curr_thought.value = "";
                    thoughtedMsg.innerHTML = `Thoughted: ${data.thoughted}`;
                    contextMsg.innerHTML = data.msg;
                    thoughtsMsg.classList.remove('hidden');
                };
            });
    }
}

// Ellenőrzi az oldalindex helyességét.
function chkPageIndex(Index, headerIndexes) {
    console.log(Index + headerIndexes)
    if (Index >= 0 && Index <= headerIndexes) return true;
    else return false;
}

// Lekéri és megjeleníti az összes gondolatot.
function getThoughts(e) {
    get(`http://192.168.0.143:8000/api/thoughts/${currHeader}`).then((data) => {
        removeThought();
        thoughtsContent.style.padding = "20px 0";
        data.forEach(d => {
            generateThought(d);
        });
        // A gondolatokhoz tartozó szavazatok kezelése.
        var downVoteBT = document.querySelectorAll('.downVoteBT'),
            upVoteBT = document.querySelectorAll('.upVoteBT');

        downVoteBT.forEach(element => element.addEventListener('click', event => {
            sendVote(element);
        }));

        upVoteBT.forEach(element => element.addEventListener('click', event => {
            sendVote(element);
        }));
    });
}

// A szavazatok elküldése a szervernek.
function sendVote(e) {
    postData("http://192.168.0.143:8000/api/thoughts/vote", { thought: e.getAttribute('data-thought'), vote: e.getAttribute('data-vote') })
    .then((response) => {
        CurrStatusCode = response.status;
        return response.json()
    }).then(data => {
        if (CurrStatusCode == 201) {
            dspVote(e, data)
        };
    });
}

// A szavazatok megjelenítése és kezelése.
function dspVote(e, data) {
    var voteBank = document.querySelectorAll(`[data-thought = "${e.getAttribute('data-thought')}"]`),
        currVote = document.querySelector(`[data-thought-dsp = "${e.getAttribute('data-thought')}"]`),
        isVote = data.vote_code > 0 ? true : false;

    // Ha a szavazás aktív, az aktív gomb színét megváltoztatja.
    if (data.vote_msg == "active") {
        deactivateBank(voteBank);
        activateVote(isVote, e);
    }
    // Ha a szavazás inaktív, minden gombot letilt.
    else if (data.vote_msg == "deactive") {
        deactivateBank(voteBank);
    }

    // A szavazatok összesítése és megjelenítése.
    currVote.innerHTML = (parseInt(currVote.textContent) + data.vote_code);
}

// Minden gomb inaktívvá tétele.
function deactivateBank(bank) {
    bank.forEach(element => {
        element.classList.remove('downVoteAct','upVoteAct');
    });
}

// Az aktív szavazat megjelenítése.
function activateVote(isVote, e) {
    if (isVote) document.querySelector(`[data-thought = "${e.getAttribute('data-thought')}"][data-vote="1"]`).classList.add('upVoteAct');
    else document.querySelector(`[data-thought = "${e.getAttribute('data-thought')}"][data-vote="-1"]`).classList.add('downVoteAct');
}