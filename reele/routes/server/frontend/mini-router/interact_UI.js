const sendBT = document.querySelector('#sendbt');
const uIcon = document.querySelector('#u_icon');
const profileDefault = document.querySelector('#ucico_img');

// Toggle to the right position
function toggleto(btId) {
    clearValues();
    resetImg();
    setDefault();
    document.querySelector('[data_selected_bt="active"]').removeAttribute('data_selected_bt');
    document.querySelector(`#${btId}`).setAttribute('data_selected_bt', 'active');
    document.querySelector('#u_icon_tit').innerText = "Profile picture (Optional)";
    const targetId = btId;
    const targetCont = document.querySelector('.u_interact');
    const targetTit = document.querySelector('#interact_tit');
    const signElements = document.querySelectorAll('.sign_element');
    const sendBox = document.querySelector('#btBox');
    const interForm = document.querySelector('.interForm');


    switch (targetId) {
        case "login":
            targetCont.id = "login";
            interForm.id = "loginF";
            targetTit.innerText = "Log in";
            document.title = ".reele - log in";
            targetCont.setAttribute("data_interact_state", "log")
            document.querySelector('.log_element').classList.remove("non_log");

            signElements.forEach(function (signElement) {
                signElement.classList.add("non_sign");
            });
            break;
        case "signup":
            targetCont.id = "signup";
            interForm.id = "signupF";
            targetTit.innerText = "Sign Up";
            document.title = ".reele - sign up";
            targetCont.setAttribute("data_interact_state", "sign")
            document.querySelector('.log_element').classList.add("non_log");
            sendBox.setAttribute('style', 'width: 0; margin: 0');

            signElements.forEach(function (signElement) {
                signElement.classList.remove("non_sign");
            });
            break;
        default:
            // Other case
            break;
    }
}

// Clear inputs
function clearValues() {
    var clearInps = document.querySelectorAll('input');
    clearInps.forEach(function (clearInput) {
        clearInput.value = null;
    });
}

// Reset image
function resetImg() {
    profileDefault.src = "../assets/add_uico.png";
    profileDefault.setAttribute('style', 'height: 3em; vertical-align: middle;');
    uIcon.value = null;
}

function setDefault() {
    (document.querySelector('#email').placeholder = "youremail@random.com", document.querySelector('#username').placeholder = "username", document.querySelector('#password').placeholder = "................", document.querySelector('#confirmPassword').placeholder = "................", document.querySelector('#email-fav').className = 'fa-mail', document.querySelector('#username-fav').className = 'fa-book', document.querySelector('#password-fav').className = 'fa-key', document.querySelector('#confirmPassword-fav').className = 'fa-key');
}

// Show send bt
sendBT.addEventListener('click', () => {
    document.querySelector('#btBox').removeAttribute('style');
});