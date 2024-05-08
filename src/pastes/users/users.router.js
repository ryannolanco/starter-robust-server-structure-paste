const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./users.controller");

router.route("/:userId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router