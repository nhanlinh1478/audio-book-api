var express = require("express");
var router = express.Router();
const bookController = require("../controllers/BookController");
const authenticate = require("../authenticate");
const adminMiddleware = require("../middleware/admin");
const multer = require("multer");
const upload = multer();

router.get("/", bookController.findAll);
router.get("/:bookId", bookController.findOne);
router.post(
  "/",
  upload.single("thumbnail"),
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  bookController.create
);
// router.put(
//   "/:bookId",
//   authenticate.verifyUser,
//   adminMiddleware.requiredAdmin,
//   bookController.update
// );
// router.delete(
//   "/:bookId",
//   authenticate.verifyUser,
//   adminMiddleware.requiredAdmin,
//   bookController.delete
// );

module.exports = router;
