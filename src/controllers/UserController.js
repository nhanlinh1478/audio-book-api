const UserAction = require("../actions/UserAction");

class UserController {
  // [GET] /users/account/profile
  async profile(req, res) {
    const userAction = new UserAction();
    const userId = req.user._id;
    const code = res.statusCode;
    return res.send(await userAction.profile(userId, code));
  }
  // [POST] /users/account/password
  async password(req, res) {
    const userAction = new UserAction();
    const userId = req.user._id;
    const code = res.statusCode;
    const oldPassword = req.body.oldPassword;
    const password = req.body.password;
    return res.send(
      await userAction.password(userId, oldPassword, password, code)
    );
  }

  // [GET] /users
  async findAll(req, res) {
    const userAction = new UserAction();
    const code = res.statusCode;
    return res.send(await userAction.findAll(code));
  }
  // [GET] /users/:userId
  async findOne(req, res) {
    const userAction = new UserAction();
    const userId = req.params.userId;
    const code = res.statusCode;
    return res.send(await userAction.findOne(userId, code));
  }
  // [POST] /users
  async create(req, res) {
    const userAction = new UserAction();
    const code = res.statusCode;
    return res.send(await userAction.create(req.body, code));
  }
  // [PUT] /users/:userId
  async update(req, res) {
    const userAction = new UserAction();
    const userId = req.params.userId;
    const code = res.statusCode;
    return res.send(await userAction.update(userId, req.body, code));
  }
  // [DELETE] /users/:userId
  async delete(req, res) {
    const userAction = new UserAction();
    const userId = req.params.userId;
    const code = res.statusCode;
    return res.send(await userAction.delete(userId, code));
  }
}
module.exports = new UserController();
