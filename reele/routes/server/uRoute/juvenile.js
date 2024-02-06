module.exports = class Juvenile {
    user_id = null;
    username = "";
    email = "";
    password = "";
    token = "";

    constructor (user_id = null,username,email,password,token = "") {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.token = token;
    }
}