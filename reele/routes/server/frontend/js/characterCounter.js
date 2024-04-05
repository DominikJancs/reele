function charaters(downlimit, toplimit, target) {
    // A karakter változóban tároljuk a célsztring hosszát
    let character = target.length;
    // Ellenőrizzük, hogy a karakter hossza az elfogadott határok között van-e
    // Ha igen, igazat térünk vissza
    if (downlimit <= character && character <= toplimit) return true;
    // Ha nem, hamisat térünk vissza
    else return false;
}