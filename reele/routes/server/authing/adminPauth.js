const jwt = require("jsonwebtoken");
const setup = require("../setup");


// Adminisztrátori jogosultság ellenőrző middleware függvény
async function verifyAdmin(req, res, next) {
    const adminToken = req.cookies.admin;// Admin token lekérése a süti-ből
    const name = req.params.admin;// Admin név lekérése a kérés paramétereiből
    try {
        // Admin ellenőrzése JWT token alapján
        const admin = await jwt.verify(adminToken, setup.tokenset);
        // Admin adatok összeállítása
        var adata = {
          name: admin.name,
        };
        // Admin adatok hozzáadása a kéréshez
        req.admin = adata;
        // Ellenőrzés: a paraméterben megadott név egyezik-e az admin névével
        if (adata.name == name) next(); // Továbbítás a következő middleware-nek
        else return res.redirect("/"); // Átirányítás, ha nem megfelelő a név
    }
    catch {
        // Hiba esetén admin süti törlése és átirányítás
        res.clearCookie("admin");
        return res.redirect("/");
    }
}

exports.verifyAdmin = verifyAdmin;