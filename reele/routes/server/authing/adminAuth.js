const jwt = require("jsonwebtoken");
const setup = require("../setup");

// Adminisztrátori jogosultság ellenőrző middleware függvény
async function verifyAdmin(req, res, next) {
  const adminToken = req.cookies.admin;
  const name = req.params.admin;
  try {
    const admin = await jwt.verify(adminToken, setup.tokenset);
    var adata = {
      name: admin.name,
    };
    req.admin = adata;
    // Következő middleware vagy útvonal kezelése

    next();
  } catch {
    // Ha a token érvénytelen, adminisztrátori cookie törlése és átirányítás a főoldalra
    res.clearCookie("admin");
    return res.redirect("/");
  }
}

exports.verifyAdmin = verifyAdmin;
