const Express = require("express");
const router = Express.Router();
const AuthControler = require("../controllers/AuthController");
//controller

router.get("/login", AuthControler.login);
router.get("/register", AuthControler.register);
router.post("/register", AuthControler.registerPost);
router.get("/logout", AuthControler.logout);
router.post("/login", AuthControler.loginPost);
module.exports = router;
