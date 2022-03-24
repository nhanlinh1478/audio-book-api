var express = require("express");
var router = express.Router();
const userController = require("../controllers/UserController");
const authenticate = require("../authenticate");

router.get("/", authenticate.verifyUser, userController.index);

module.exports = router;
