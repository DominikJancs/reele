async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST", // POST, PUT, DELETE ...       
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
        method: "POST", // POST, PUT, DELETE ...       
        body: formData,
    });
    return response;
}; 

async function get(url = "") {
    const response = await fetch(url, {
        method: "GET", // POST, PUT, DELETE ...  
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.json();
} 