// Email cím ellenőrzése
function validmail(mail) {
    //Az email címnek email cím formátumúnak kell lennie
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(mail);
}

// Jelszó érvényességének ellenőrzése
function validPass(pass)
{
    // A jelszónak legalább egy kisbetűt, egy nagybetűt, egy számot és egy speciális karaktert kell tartalmaznia, és legalább 6 karakter hosszúnak kell lennie
    var reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return reg.test(pass);
}