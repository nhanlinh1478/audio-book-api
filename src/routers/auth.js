var express = require("express");
var router = express.Router();
const authController = require("../controllers/AuthController");

router.post("/SignIn", authController.SignIn);
router.post("/SignUp", authController.SignUp);

router.post("/Login", authController.Login); //Admin

router.post("/ForgotPassword", authController.ForgotPassword);
router.get("/CheckForgotPasswordCode/:forgotPasswordCode", authController.CheckForgotPasswordCode);
router.post("/ResetPassword/:forgotPasswordCode", authController.ResetPassword);

router.post("/ReActivationAccount", authController.ReActivationAccount);
router.get("/ActivationAccount/:activationCode", authController.ActivationAccount);

module.exports = router;
