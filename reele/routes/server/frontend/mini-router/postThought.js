const sendThought = document.querySelector('#sendThought'),
    openThoughts = document.querySelector('#openThoughts'),
    currHeader = document.body.getAttribute('data-reele');
var CurrStatusCode = null;

sendThought.addEventListener('click', event => {
    thougtAction(event);
});

openThoughts.addEventListener('click', event => {
    getThoughts(event);
});

function thougtAction(e) {
    var curr_thought = document.querySelector('#thought_inp'),
        thoughtsContent = document.querySelector('.thoughts_content');
    thoughtsMsg = document.querySelector('#thoughts_msg');
    headerIndexes = document.querySelector('#header-pages').getAttribute('data-pages'),
        indexPages = document.querySelector('.indexBX').getAttribute('data-pages'),
        chk_index = chkPageIndex(indexPages, headerIndexes),
        chk_thought = charaters(5, 255, curr_thought.value);

    console.log(headerIndexes)

    if (chk_thought && chk_index) {
        var thoughtedMsg = document.querySelector('#thoughted_msg'),
            contextMsg = document.querySelector('#context_msg');

        postData(`http://localhost:8000/api/thought/${currHeader}`, { thought: curr_thought.value, pages: indexPages })
            .then((response) => {
                CurrStatusCode = response.status;
                return response.json()
            }).then(data => {
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

function chkPageIndex(Index, headerIndexes) {
    console.log(Index + headerIndexes)
    if (Index >= 0 && Index <= headerIndexes) return true;
    else return false;
}

function getThoughts(e) {
    get(`http://localhost:8000/api/thoughts/${currHeader}`).then((data) => {
        removeThought();
        thoughtsContent.style.padding = "20px 0";
        data.forEach(d => {
            generateThought(d);
        });
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

function sendVote(e) {
    postData("http://localhost:8000/api/thoughts/vote", { thought: e.getAttribute('data-thought'), vote: e.getAttribute('data-vote') })
        .then((response) => {
            CurrStatusCode = response.status;
            return response.json()
        }).then(data => {
            if (CurrStatusCode == 201) {
                dspVote(e, data)
            };
        });
}

function dspVote(e, data) {
    var voteBank = document.querySelectorAll(`[data-thought = "${e.getAttribute('data-thought')}"]`),
        currVote = document.querySelector(`[data-thought-dsp = "${e.getAttribute('data-thought')}"]`),
        isVote = data.vote_code > 0 ? true : false;

    if (data.vote_msg == "active") {
        deactivateBank(voteBank);
        activateVote(isVote, e);
    }
    else if (data.vote_msg == "deactive") {
        deactivateBank(voteBank);
    }

    currVote.innerHTML = (parseInt(currVote.textContent) + data.vote_code);
}

function deactivateBank(bank) {
    bank.forEach(element => {
        element.classList.remove('downVoteAct', 'upVoteAct');
    });
}

function activateVote(isVote, e) {
    if (isVote) document.querySelector(`[data-thought = "${e.getAttribute('data-thought')}"][data-vote="1"]`).classList.add('upVoteAct');
    else document.querySelector(`[data-thought = "${e.getAttribute('data-thought')}"][data-vote="-1"]`).classList.add('downVoteAct');
}