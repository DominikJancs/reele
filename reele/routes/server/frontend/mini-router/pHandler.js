const navIcon = document.querySelector('.navicon');
var CurrStatusCode = null;

navIcon.addEventListener('click', event => {
    redirect("/");
});

async function upActIc(f) {
    CurrStatusCode = null;
    if (f) {
        return new Promise((resolve, reject) => {
            postForm('http://localhost:8000/api/ich', f)
                .then((response) => {
                    CurrStatusCode = response.status;
                    return response.json()
                }).then(data => {
                    if (CurrStatusCode == 201) resolve(true);
                    else resolve(false);
                });
        });
    }
}

async function upActPass(d) {
    CurrStatusCode = null;
    if (d) {
        return new Promise((resolve, reject) => {
            postData('http://localhost:8000/api/pch', d)
                .then((response) => {
                    CurrStatusCode = response.status;
                    return response.json()
                }).then(data => {
                    if (CurrStatusCode == 201) resolve(true);
                    else resolve(false);
                });
        });
    }
}

async function upActDes(d) {
    CurrStatusCode = null;
    if (d) {
        return new Promise((resolve, reject) => {
            postData('http://localhost:8000/api/des', d)
                .then((response) => {
                    CurrStatusCode = response.status;
                    return response.json()
                }).then(data => {
                    if (CurrStatusCode == 201) resolve(true);
                    else resolve(false);
                });
        });
    }
}