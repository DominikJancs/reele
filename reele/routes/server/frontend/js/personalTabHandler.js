const editBt = document.querySelectorAll('.editBt'),
    editSign = document.querySelectorAll('.editSign'),
    sigEl = document.querySelectorAll('.sign_element');

editBt.forEach(element => element.addEventListener('click', event => {
    setcurr(event.target);
}));

function setcurr(target) {
    var chpass = document.querySelector('#password').value,
        currpass = document.querySelector('#subEditPassword').value,
        passcombo = { change: chpass, current: currpass };

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

async function applyEditAction(target, data) {
    switch (target.id) {
        case "editPass":
            addCancel(target)
            document.querySelector('#editPassCurr').classList.remove('non_sign');
            break;
        case "subeditPass":
            var passChk = validPass(data.change);
            if (passChk) var passRes = await upActPass(data);
            if (passRes) (resetEditForm());
            else /*Error handleing*/;
            break;
    }
}

function addCancel(target) {
    (target.classList.add('cancelBt'), target.innerText = "✘");
}