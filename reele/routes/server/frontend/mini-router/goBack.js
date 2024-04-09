const navIcon = document.querySelector('.navicon');

try {
    navIcon.addEventListener('click', event => {
        redirect("/");
    });
} catch {
    let a = "";
}
