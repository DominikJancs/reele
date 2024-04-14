async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",     
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response;
};

async function postForm(url = "", img) {
    const formData = new FormData();
    formData.append('icon', img);

    const response = await fetch(url, {
        method: "POST",      
        body: formData,
    });
    return response;
}; 

async function postDataForm(url = "", target, file) {
    const formData = new FormData();
    formData.append('target', target);
    formData.append('icon', file);

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });
    return response;
}; 

async function postDatasForm(url = "", data = [], file, file_2) {
    const formData = new FormData();
    formData.append('data', data);
    formData.append('cover', file);
    formData.append('file', file_2);

    const response = await fetch(url, {
        method: "POST", 
        body: formData,
    });
    return response;
}; 

async function get(url = "") {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.json();
} 

async function getData(url = "") {
    const response = await fetch(url, {
        method: "GET", 
    })
    return response;
} 