const AuthAction = require("../actions/AuthAction");

class AuthController {
  // [POST] /auth/SignIn
  async SignIn(req, res) {
    const authAction = new AuthAction();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await authAction.SignIn(email, password, code));
  }

  // [POST] /auth/SignUp
  async SignUp(req, res) {
    const authAction = new AuthAction();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await authAction.SignUp(email, password, code));
  }

  // Admin [POST] /auth/login
  async Login(req, res) {
    const authAction = new AuthAction();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await authAction.Login(email, password, code));
  }

  // [POST] /auth/ForgotPassword
  async ForgotPassword(req, res) {
    const authAction = new AuthAction();
    const email = req.body.email;
    const code = res.statusCode;
    return res.send(await authAction.ForgotPassword(email, code));
  }

  // [GET] /auth/CheckForgotPasswordCode/:forgotPasswordCode
  async CheckForgotPasswordCode(req, res) {
    const authAction = new AuthAction();
    const forgotPasswordCode = req.params.forgotPasswordCode;
    const code = res.statusCode;
    return res.send(
      await authAction.CheckForgotPasswordCode(forgotPasswordCode, code)
    );
  }

  // [POST] /auth/ResetPassword/:forgotPasswordCode
  async ResetPassword(req, res) {
    const authAction = new AuthAction();
    const forgotPasswordCode = req.params.forgotPasswordCode;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(
      await authAction.ResetPassword(forgotPasswordCode, password, code)
    );
  }

  // [POST] /auth/ReActivationAccount
  async ReActivationAccount(req, res) {
    const authAction = new AuthAction();
    const email = req.body.email;
    const code = res.statusCode;
    return res.send(await authAction.ReActivationAccount(email, code));
  }

  // [GET] /auth/ActivationAccount/:activationCode
  async ActivationAccount(req, res) {
    const authAction = new AuthAction();
    const activationCode = req.params.activationCode;
    const code = res.statusCode;
    return res.send(await authAction.ActivationAccount(activationCode, code));
  }
}

module.exports = new AuthController();
