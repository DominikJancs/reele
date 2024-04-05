const validator = require("email-validator"); // Importáljuk az email-validator csomagot az email címek ellenőrzéséhez
const passvalid = require("./passvalidation"); // Importáljuk a passvalidation modult a jelszó ellenőrzéséhez

// Az aszinkron validációs funkció
async function validation(req, res, next) {
    let checkany = null; // Ellenőrzési változó inicializálása
    var formType = req.body.form; // Űrlap típusának kinyerése a kérésből

    // Ha bejelentkezési űrlapról van szó
    if (formType === "login") {
        checkany = await checkLog(req); // Ellenőrizzük a bejelentkezési adatokat
    }
    // Ha regisztrációs űrlapról van szó
    else if (formType === "signup") {
        checkany = await checkSign(req); // Ellenőrizzük a regisztrációs adatokat
    }
    else {
        return res.status(400).send("Something went wrong!"); // Ha ismeretlen űrlap típus érkezik, hibát küldünk
    }

    if (checkany) next(); // Ha az ellenőrzés sikeres, továbblépünk a következő middleware-hez
}

// Az aszinkron funkció, ami a bejelentkezési adatokat ellenőrzi
async function checkLog(data) {
    let checkData = true; // Alapértelmezett érték: igaz
    // Ha valamelyik adat hiányzik vagy nem megfelelő a formátuma, vagy a jelszó hossza nem megfelelő
    if (!(data.body.email && data.body.password && validator.validate(data.body.email) && await passvalid.password(data.body.password)) && data.body.password.length < 6 || data.body.password.length > 30) checkData = false;
    return checkData; // Az ellenőrzési eredményt visszaadjuk
}

// Az aszinkron funkció, ami a regisztrációs adatokat ellenőrzi
async function checkSign(data) {
    let checkData = true; // Alapértelmezett érték: igaz
    // Ha valamelyik adat hiányzik vagy nem megfelelő a formátuma, vagy a jelszavak nem egyeznek, vagy a jelszó hossza nem megfelelő
    if (!(data.body.username && data.body.email && data.body.password && data.body.confirmPassword && validator.validate(data.body.email) && await passvalid.password(data.body.password)) && data.body.password !== data.body.confirmPassword && data.body.password.length < 6 || data.body.password.length > 30) checkData = false;
    return checkData; // Az ellenőrzési eredményt visszaadjuk
}

// Az exporthoz rendeljük a validation függvényt
exports.validation = validation;
