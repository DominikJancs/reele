const navIcon = document.querySelector('.navicon');
var CurrStatusCode = null;

navIcon.addEventListener('click', event => {
    redirect("/");
});

async function upActIc(f) {
    return new Promise((resolve, reject) => {
        postForm('http://192.168.0.143:8000/api/ich', f)
            .then((response) => {
                CurrStatusCode = response.status;
                return response.json()
            }).then(data => {
                if (CurrStatusCode == 201) resolve(true);
                else resolve(false);
            });
    });
}

async function upActPass(d) {
    return new Promise((resolve, reject) => {
        postData('http://192.168.0.143:8000/api/pch', d)
            .then((response) => {
                CurrStatusCode = response.status;
                return response.json()
            }).then(data => {
                if (CurrStatusCode == 201) resolve(true);
                else resolve(false);
            });
    });
}