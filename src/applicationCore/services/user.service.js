const User = require('../../applicationData/entities/user');
const bcrypt = require('bcrypt');
const ServiceResult = require('../common/serviceResult');
const {
    NOT_FOUND,
    READ_ONE,
    READ_MANY,
    CREATE,
    UPDATE,
    DELETE,
    OLD_PASSWORD_INCORRECT,
    EMAIL_EXITS,
    ITEMS_PER_PAGE,
} = require('../common/applicationConstant');

module.exports = class UserService {
    async profile(userId) {
        const user = await User.findById(userId);
        if (!user) {
            return new ServiceResult(false, NOT_FOUND);
        }

        return new ServiceResult(true, READ_ONE, { user });
    }
    async password(userId, oldPassword, password) {
        const user = await User.findById(userId);
        if (!user) {
            return new ServiceResult(false, NOT_FOUND);
        }

        const compare = await bcrypt.compare(oldPassword, user.password);
        if (compare == false) {
            return new ServiceResult(false, OLD_PASSWORD_INCORRECT);
        }
        user.password = bcrypt.hashSync(password, 10);
        await user.save();
        return new ServiceResult(true, UPDATE);
    }
    async findAll(pageSize, pageNum) {
        const itemsPerPage = (pageSize > 0 && pageSize) || ITEMS_PER_PAGE;
        const currentPage = (pageNum > 0 && pageNum) || 1;
        const maxPages = Math.ceil((await User.count()) / itemsPerPage);

        const users = await User.find()
            .skip(itemsPerPage * currentPage - itemsPerPage)
            .limit(itemsPerPage);
        return new ServiceResult(true, READ_MANY, {
            pagination: {
                pageNum: Number(currentPage),
                pageSize: Number(itemsPerPage),
                pageCount: Number(maxPages),
            },
            users,
        });
    }
    async findOne(userId) {
        const user = await User.findById(userId);
        if (!user) {
            return new ServiceResult(false, NOT_FOUND);
        }

        return new ServiceResult(true, READ_ONE, { user });
    }
    async create(body) {
        const user = await User.findOne({ email: body.email });
        if (user) {
            return new ServiceResult(false, EMAIL_EXITS);
        }

        const newUser = new User(body);
        newUser.password = bcrypt.hashSync(body.password, 10);
        await newUser.save();
        return new ServiceResult(true, CREATE, { newUser });
    }
    async update(userId, body) {
        const user = await User.findById(userId);
        if (!user) {
            return new ServiceResult(false, NOT_FOUND);
        }

        user.username = body.username;
        user.isVip = body.isVip;
        if (user.email != 'admin@admin.com') {
            user.isAdmin = body.isAdmin;
            user.isLock = body.isLock;
        }

        await user.save();
        return new ServiceResult(true, UPDATE, { user });
    }
    async delete(userId) {
        const user = await User.findById(userId);
        if (!user) {
            return new ServiceResult(false, NOT_FOUND);
        }

        await user.remove();
        return new ServiceResult(true, DELETE);
    }
};
