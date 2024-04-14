const listLogout = document.querySelector('#list-logout'),
listProfile = document.querySelector('#list-profile');

listProfile.addEventListener('click', event => {
    redirect("/profile/");
});

listLogout.addEventListener('click', event => {
    get("http://localhost:8000/api/logout").then((data) => {
        if(data.success) redirect("/");
    });
});