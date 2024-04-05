const creCl = document.querySelector('#creCl'),
    genresLoc = [],
    librasLoc = [];

creCl.addEventListener('click', (e) => {
    var clubRawInf = {
        clubicon: document.querySelector('#c_icon'),
        clubbanner: document.querySelector('#c_banner'),
        clubname: document.querySelector('#clubname').value,
        genres: [...document.querySelectorAll('[data-genre]')],
        libras: [...document.querySelectorAll('.libra_item')],
        club_description: document.querySelector('#description_tb').value
    };
    var clubInfMsg = chkClubInf(clubRawInf);

    if (clubInfMsg.value) createclub(clubRawInf);
    else dspCErr(clubInfMsg.err_code);
});

function chkClubInf(clubInf) {
    var errLoc = [],
        errChk = true;

    if (clubInf.clubname.length == 0) (errChk = false, errLoc.push(1));
    if (clubInf.genres.length < 2) (errChk = false, errLoc.push(2));
    if (clubInf.libras.length < 2 || clubInf.libras.length > 6) (errChk = false, errLoc.push(3));
    if (clubInf.clubicon.value.length == 0) (errChk = false, errLoc.push(4));
    if (clubInf.clubbanner.value.length == 0) (errChk = false, errLoc.push(5));
    if (clubInf.clubicon.length == 0 && clubInf.clubbanner.length == 0) (errChk = false, errLoc.push(6));
    return { value: errChk, err_code: errLoc };
}

function createclub(Cdata) {
    var genreArr = [],
        libraArr = [];

    var CurrStatusCode = null;

    Cdata.genres.forEach(genre => {
        genreArr.push(genre.getAttribute('data-genre'));
    });
    Cdata.libras.forEach(libra => {
        libraArr.push(libra.getAttribute('data-libra'));
    });

    const clubdata = {
        clubname: Cdata.clubname,
        genres: genreArr,
        libras: libraArr,
        clubdesc: Cdata.club_description
    };

    postData(`http://192.168.0.143:8000/api/create-club`, clubdata).then((response) => {
        CurrStatusCode = response.status;
        return response.json();
    })
        .then(data => {
            console.log(CurrStatusCode)
            switch (CurrStatusCode) {
                case 404:
                    //
                    break;
                case 201:
                    postDataForm('http://192.168.0.143:8000/api/upclubic', clubdata.clubname, Cdata.clubicon.files[0])
                        .then((response) => {
                            CurrStatusCode = response.status;
                            return response.json()
                        }).then(data => {
                            if (CurrStatusCode == 201) {
                                postDataForm('http://192.168.0.143:8000/api/upclubbanner', clubdata.clubname, Cdata.clubbanner.files[0])
                                    .then((response) => {
                                        CurrStatusCode = response.status;
                                        return response.json()
                                    }).then(data => {
                                        if (CurrStatusCode == 201) {
                                            //  
                                        };
                                    });
                            };
                        });
                case 500:
                    // Server error...
                    break;
                default:
                    //Other
                    break;
            }
        });
}

function dspCErr(err) {
    var clubInp = document.querySelector('#clubname'),
        clubname_fav = document.querySelector('#clubname_fav'),
        genre_msg = document.querySelector('#genre-msg'),
        libra_msg = document.querySelector('#libra-msg'),
        imgTitle = document.querySelector('#imgTitle');

    err.forEach(err_code => {
        switch (err_code) {
            case 1:
                clubInp.setAttribute('placeholder', 'Please fill out this field...');
                clubname_fav.className = "fa-alert";
                break;
            case 2:
                genre_msg.style.color = 'var(--bright-red)'
                break;
            case 3:
                libra_msg.style.color = 'var(--bright-red)'
                break;
            case 4:
                imgTitle.innerHTML = "Please add a Club profile picture..."
                break;
            case 5:
                imgTitle.innerHTML = "Please add a Club banner..."
                break;
            case 6:
                imgTitle.innerHTML = "Please add a Club profile and banner..."
                break;
            default:
                //
                break;
        }
    });
}