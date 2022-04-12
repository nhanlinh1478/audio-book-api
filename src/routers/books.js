var express = require("express");
var router = express.Router();
const bookController = require("../controllers/BookController");
const audioController = require("../controllers/AudioController");
const authenticate = require("../authenticate");
const adminMiddleware = require("../middleware/admin");
const multer = require("multer");
const upload = multer();

router.get("/", bookController.findAll);
router.get("/category/:categoryId", bookController.findAllBookInCategory);
router.get("/slug/:slug", bookController.findOneBySlug);
router.get("/:bookId", bookController.findOne);
router.post(
  "/",
  upload.single("thumbnail"),
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  bookController.create
);
router.put(
  "/:bookId",
  upload.single("thumbnail"),
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  bookController.update
);
router.delete(
  "/:bookId",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  bookController.delete
);

router.get("/:bookId/audios", audioController.findAllAudio);
router.get("/:bookId/audios/:audioId", audioController.findOneAudio);
router.post(
  "/:bookId/audios",
  upload.single("file"),
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  audioController.createAudio
);
router.put(
  "/:bookId/audios/:audioId",
  upload.single("file"),
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  audioController.updateAudio
);
router.delete(
  "/:bookId/audios/:audioId",
  authenticate.verifyUser,
  adminMiddleware.requiredAdmin,
  audioController.deleteAudio
);

module.exports = router;
