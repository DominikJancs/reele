const listLogout = document.querySelector('#list-logout'),
listProfile = document.querySelector('#list-profile');


listProfile.addEventListener('click', event => {
    redirect("/profile/");
});

listLogout.addEventListener('click', event => {
    get("http://192.168.0.143:8000/api/logout").then((data) => {
        if(data.success) redirect("/");
    });
});