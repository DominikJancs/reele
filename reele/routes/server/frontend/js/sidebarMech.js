const sideBT = document.querySelectorAll('.side-bt'),
      slideBX = document.querySelectorAll('.slide-bx'),
      sideAicon = document.querySelectorAll('.side-bt-icon-a'),
      leftSideBar = document.querySelector('#left-slide-bx'),
      rightSideBar = document.querySelector('#right-slide-bx'),
      leftAicon = document.querySelector('#left-side-icon-a'),
      rightAicon = document.querySelector('#right-side-icon-a'),
      bodyClass = document.body.classList;

sideBT.forEach(element => element.addEventListener('click', event => {
    if (window.innerWidth < 1200) sideBarAct(event);
}));

function sideBarAct(e) {
    clearAlayer();
    const sideID = e.target.id;
    if (sideID == "left-side-bt") {
        if (leftSideBar.classList.contains("open")) (leftSideBar.classList.remove("open"));
        else (leftSideBar.classList.add("open"), bodyClass.add('dis-scroll'), leftAicon.classList.add('opacity-side-bt'));
        rightSideBar.classList.remove("open");
    } else if (sideID == "right-side-bt") {
        if (rightSideBar.classList.contains("open")) (rightSideBar.classList.remove("open"));
        else (rightSideBar.classList.add("open"), rightAicon.classList.add('opacity-side-bt'));
        if (!e.target.classList.contains('bookmark-side-icon')) leftSideBar.classList.remove("open");
    }
}

function clearAlayer() {
    sideAicon.forEach(sideAiconElement => {
        sideAiconElement.classList.remove('opacity-side-bt');
    }); 
}

function closeall() {
    slideBX.forEach(slidebxElement => {
        slidebxElement.classList.remove('open');
    }); 
}

window.addEventListener('resize', event => {
    if (window.innerWidth > 1200) (clearAlayer(), leftSideBar.classList.remove("open"), rightSideBar.classList.remove("open"), bodyClass.remove('disscrolled'), navBarCl.remove('shrinked'), selectBarCl.remove('shrinked'));
});