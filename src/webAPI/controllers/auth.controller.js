const AuthService = require('../../applicationCore/services/auth.service');

class AuthController {
    // [POST] /auth/SignIn
    async SignIn(req, res) {
        const authService = new AuthService();
        const email = req.body.email;
        const password = req.body.password;

        return res.send(await authService.SignIn(email, password));
    }

    // [POST] /auth/SignUp
    async SignUp(req, res) {
        const authService = new AuthService();
        const email = req.body.email;
        const password = req.body.password;

        return res.send(await authService.SignUp(email, password));
    }

    // Admin [POST] /auth/login
    async Login(req, res) {
        const authService = new AuthService();
        const email = req.body.email;
        const password = req.body.password;

        return res.send(await authService.Login(email, password));
    }

    // [POST] /auth/ForgotPassword
    async ForgotPassword(req, res) {
        const authService = new AuthService();
        const email = req.body.email;

        return res.send(await authService.ForgotPassword(email));
    }

    // [GET] /auth/CheckForgotPasswordCode/:forgotPasswordCode
    async CheckForgotPasswordCode(req, res) {
        const authService = new AuthService();
        const forgotPasswordCode = req.params.forgotPasswordCode;

        return res.send(await authService.CheckForgotPasswordCode(forgotPasswordCode));
    }

    // [POST] /auth/ResetPassword/:forgotPasswordCode
    async ResetPassword(req, res) {
        const authService = new AuthService();
        const forgotPasswordCode = req.params.forgotPasswordCode;
        const password = req.body.password;

        return res.send(await authService.ResetPassword(forgotPasswordCode, password));
    }

    // [POST] /auth/ReActivationAccount
    async ReActivationAccount(req, res) {
        const authService = new AuthService();
        const email = req.body.email;

        return res.send(await authService.ReActivationAccount(email));
    }

    // [GET] /auth/ActivationAccount/:activationCode
    async ActivationAccount(req, res) {
        const authService = new AuthService();
        const activationCode = req.params.activationCode;

        return res.send(await authService.ActivationAccount(activationCode));
    }
}

module.exports = new AuthController();
