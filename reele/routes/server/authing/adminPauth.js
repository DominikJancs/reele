const jwt = require("jsonwebtoken");
const setup = require("../setup");

async function verifyAdmin(req, res, next) {
    const adminToken = req.cookies.admin;
    const name = req.params.admin;
    try {

        const admin = await jwt.verify(adminToken, setup.tokenset);

        var adata = {
          name: admin.name,
        };

        req.admin = adata;

        if (adata.name == name) next(); 
        else return res.redirect("/"); 
    }
    catch {

        res.clearCookie("admin");
        return res.redirect("/");
    }
}

exports.verifyAdmin = verifyAdmin;