function charaters(downlimit, toplimit, target) {
    let character = target.length;
    if (downlimit <= character && character <= toplimit) return true;
    else return false;
}