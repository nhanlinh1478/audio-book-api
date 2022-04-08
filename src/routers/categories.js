var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/CategoryController");
const authenticate = require("../authenticate");
const adminMiddleware = require("../middleware/admin");

router.get("/", categoryController.findAll);
router.get("/:categoryId", categoryController.findOne);
router.post(
  "/",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  categoryController.create
);
router.put(
  "/:categoryId",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  categoryController.update
);
router.delete(
  "/:categoryId",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  categoryController.delete
);
module.exports = router;
