const Express = require("express");
const router = Express.Router();
const ToughtsController = require("../controllers/ToughtsController");
const checkAuth = require("../helpers/auth").checkAuth;
//controller
router.get("/add", checkAuth, ToughtsController.createTought);
router.post("/add", checkAuth, ToughtsController.createToughtSave);
router.get("/edit/:id", checkAuth, ToughtsController.updateTought);
router.post("/remove", checkAuth, ToughtsController.removeTought);
router.post("/edit", checkAuth, ToughtsController.updateToughtSave);
router.get("/dashboard", checkAuth, ToughtsController.dashboard);
router.get("/", ToughtsController.ShowToughts);

module.exports = router;
