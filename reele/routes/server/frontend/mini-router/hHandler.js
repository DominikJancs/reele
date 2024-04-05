const logo = document.querySelector('#logo'),
      reele_create = document.querySelector('#list-reele');

reele_create.addEventListener('click', event => {
    var clubname = reele_create.getAttribute('data-club');
    console.log(clubname)
    redirect(`http://192.168.0.143:8000/post/${clubname}`);
});      

logo.addEventListener('click', event => {
    redirect("/");
});
