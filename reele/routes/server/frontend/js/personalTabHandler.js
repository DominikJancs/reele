const editBt = document.querySelectorAll('.editBt'),
    editSign = document.querySelectorAll('.editSign'),
    sigEl = document.querySelectorAll('.sign_element'); 

var chpass = null,
    currpass = null;

editBt.forEach(element => element.addEventListener('click', event => {
    setcurr(event.target);
}));

function setcurr(target) {
    var passcombo = { change: chpass, current: currpass };
    chpass = document.querySelector('#password').value,
    currpass = document.querySelector('#subEditPassword').value;

    if (target.classList.contains("cancelBt")) {
        resetEditForm();
        return;
    }
    else (resetEditForm(), applyEditAction(target, passcombo));
}

function resetEditForm() {
    sigEl.forEach((element) => { element.classList.add('non_sign'); });
    editSign.forEach((element) => { element.innerText = "Edit"; });
    editBt.forEach((element) => { element.classList.remove('cancelBt'); });
}

function toclipboard() {
    if (window.isSecureContext) (showpasscopy.setAttribute('data-clipboard', chpass), showpasscopy.classList.remove('non_sign'));
}

async function applyEditAction(target, data) {
    switch (target.id) {
        case "editPass":
            addCancel(target)
            document.querySelector('#editPassCurr').classList.remove('non_sign');
            break;
        case "subeditPass":
            var passChk = validPass(data.change);
            if (passChk) var passRes = await upActPass(data);
            if (passRes) (toclipboard(), resetEditForm());
            else ;
            break;
    }
}

function addCancel(target) {
    (target.classList.add('cancelBt'), target.innerText = "✘");
}