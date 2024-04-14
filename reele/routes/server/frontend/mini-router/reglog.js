const signup = document.querySelector('#list-signup'),
      login = document.querySelector('#list-login');

signup.addEventListener('click', event => {
    redirect("/u/signup");
});

login.addEventListener('click', event => {
    redirect("/u/login");
});