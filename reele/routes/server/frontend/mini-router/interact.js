const interBT = document.querySelectorAll('.interact_bt');

// Determine what state is in
interBT.forEach(element => element.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.target.id;
    const targetCont = document.querySelector('.u_interact').id;

    if (targetId == targetCont) {
        catchroute(event, targetCont);
    }
    else if (targetId != targetCont) {
        toggleto(targetId);
    }
}));

function catchroute(e, route) {
    e.preventDefault();
    let interForm = document.querySelector(`#${route}F`);
    let iconInp = document.querySelector('#u_icon');
    let formData = new FormData(interForm);

    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        form: route
    }

    //Frontend validate
    var frValid = indicateUIreq(data);
    var CurrStatusCode = null;

    //Send to backend
    if (frValid) {
        postData(`http://192.168.0.143:8000/api/${route}`, data)
            .then((response) => {
                CurrStatusCode = response.status;
                return response.json();
            })
            .then(data => {
                console.log(data);
                switch (CurrStatusCode) {
                    case 404:
                        indicateUIres(data);
                        break;
                    case 201:
                        if (route == "signup" && iconInp.value.length > 0) postForm('http://192.168.0.143:8000/api/ich', iconInp.files[0])
                            .then((response) => {
                                CurrStatusCode = response.status;
                                return response.json()
                            }).then(data => {
                                if (CurrStatusCode == 201) redirect("/");
                            });
                        else if (route == "signup" && iconInp.value.length == 0) redirect("/");
                        else if (route == "login") redirect(data.name != null ? `/a/${data.name}` : "/");
                        break;
                    case 500:
                        // Server error...
                        break;
                    default:
                        //Other
                        break;
                }
            });
    }
}

window.catchroute = catchroute;