const Auth = require("../logical/auth");

class AuthController {
  // [POST] /auth/SignIn
  async SignIn(req, res) {
    const auth = new Auth();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await auth.SignIn(email, password, code));
  }

  // [POST] /auth/SignUp
  async SignUp(req, res) {
    const auth = new Auth();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await auth.SignUp(email, password, code));
  }

  // Admin [POST] /auth/login
  async Login(req, res) {
    const auth = new Auth();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await auth.Login(email, password, code));
  }

  // [POST] /auth/ForgotPassword
  async ForgotPassword(req, res) {
    const auth = new Auth();
    const email = req.body.email;
    const code = res.statusCode;
    return res.send(await auth.ForgotPassword(email, code));
  }

  // [GET] /auth/CheckForgotPasswordCode/:forgotPasswordCode
  async CheckForgotPasswordCode(req, res) {
    const auth = new Auth();
    const forgotPasswordCode = req.params.forgotPasswordCode;
    const code = res.statusCode;
    return res.send(
      await auth.CheckForgotPasswordCode(forgotPasswordCode, code)
    );
  }

  // [POST] /auth/ResetPassword/:forgotPasswordCode
  async ResetPassword(req, res) {
    const auth = new Auth();
    const forgotPasswordCode = req.params.forgotPasswordCode;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(
      await auth.ResetPassword(forgotPasswordCode, password, code)
    );
  }

  // [POST] /auth/ReActivationAccount
  async ReActivationAccount(req, res) {
    const auth = new Auth();
    const email = req.body.email;
    const code = res.statusCode;
    return res.send(await auth.ReActivationAccount(email, code));
  }

  // [GET] /auth/CheckActivationCode/:activationCode
  async CheckActivationCode(req, res) {
    const auth = new Auth();
    const activationCode = req.params.activationCode;
    const code = res.statusCode;
    return res.send(await auth.CheckActivationCode(activationCode, code));
  }
}

module.exports = new AuthController();
