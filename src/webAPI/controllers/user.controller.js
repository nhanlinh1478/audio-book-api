const UserService = require('../../applicationCore/services/user.service');

class UserController {
    // [GET] /users/account/profile
    async profile(req, res) {
        const userService = new UserService();
        const userId = req.user._id;

        return res.send(await userService.profile(userId));
    }
    // [POST] /users/account/password
    async password(req, res) {
        const userService = new UserService();
        const userId = req.user._id;

        const oldPassword = req.body.oldPassword;
        const password = req.body.password;
        return res.send(await userService.password(userId, oldPassword, password));
    }

    // [GET] /users
    async findAll(req, res) {
        const userService = new UserService();
        const pageSize = req.query.pageSize;
        const pageNum = req.query.pageNum;
        return res.send(await userService.findAll(pageSize, pageNum));
    }
    // [GET] /users/:userId
    async findOne(req, res) {
        const userService = new UserService();
        const userId = req.params.userId;

        return res.send(await userService.findOne(userId));
    }
    // [POST] /users
    async create(req, res) {
        const userService = new UserService();

        return res.send(await userService.create(req.body));
    }
    // [PUT] /users/:userId
    async update(req, res) {
        const userService = new UserService();
        const userId = req.params.userId;

        return res.send(await userService.update(userId, req.body));
    }
    // [DELETE] /users/:userId
    async delete(req, res) {
        const userService = new UserService();
        const userId = req.params.userId;

        return res.send(await userService.delete(userId));
    }
}
module.exports = new UserController();
