async function password(pass)
{
    var reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return reg.test(pass);
}

exports.password = password;