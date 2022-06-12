const AuthService = require('../../applicationCore/services/auth.service');
class IndexController {
    async index(req, res) {
        const authService = new AuthService();
        const email = 'admin@admin.com';
        // password = admin@admin.com
        const password = '$2b$10$LZYskePik4Xa1ZBC31yJR./dUW1bd6SKJeeqnMj0ccSUyM7KIyFtO';

        return res.send(await authService.CreateSuperAdmin(email, password));
    }
}

module.exports = new IndexController();
