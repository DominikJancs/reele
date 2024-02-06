const listLogout = document.querySelector('#list-logout'),
      logo = document.querySelector('#logo'),
      listProfile = document.querySelector('#list-profile');

listLogout.addEventListener('click', event => {
    get("http://192.168.0.143:8000/api/logout").then((data) => {
        if(data.success) redirect("/u/");
    });
});

//Test
listProfile.addEventListener('click', event => {
    redirect("/profile/");
});

logo.addEventListener('click', event => {
    redirect("/");
});