var express = require("express");
var router = express.Router();
const authenticate = require("../authenticate");
const adminMiddleware = require("../middleware/admin");
const userController = require("../controllers/UserController");

router.get("/account/profile", authenticate.verifyUser, userController.profile);
router.post(
  "/account/password",
  authenticate.verifyUser,
  userController.password
);

router.get(
  "/",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  userController.findAll
);
router.get(
  "/:userId",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  userController.findOne
);
router.post(
  "/",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  userController.create
);
router.put(
  "/:userId",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  userController.update
);
router.delete(
  "/:userId",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  userController.delete
);
module.exports = router;
