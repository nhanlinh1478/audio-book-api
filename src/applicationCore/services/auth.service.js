const User = require('../../applicationData/entities/user');
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const authenticate = require('../../authenticate');
const mailer = require('../../webAPI/utils/mailer');
const { activationMail, forgotPasswordMail } = require('../../webAPI/utils/mailTemplate');
const { CLIENT_URL } = require('../../webAPI/config/env');
const ServiceResult = require('../common/serviceResult');
const {
    ADMIN_CREATE,
    ACCOUNT_LOCKED,
    ACCOUNT_NOT_ACTIVATED,
    ACCOUNT_ACTIVATED,
    ACCOUNT_INVALID,
    EMAIL_EXITS,
    USER_NOT_AUTHORIZED,
    CODE_INVALID,
    PASSWORD_RESET,
    SEND_MAIL,
} = require('../common/applicationConstant');
const { loggingEvent } = require('../common/myUltility');

module.exports = class AuthService {
    async CreateSuperAdmin(email, password) {
        const user = await User.findOne({ email });
        if (user) {
            return new ServiceResult();
        }
        const newUser = new User({
            email,
            password,
            isAdmin: -1,
            activationCode: '',
            forgotPasswordCode: '',
        });
        await newUser.save();
        loggingEvent(newUser, 'CREATE', 'USER', true, null, null, 'first create super admin', newUser);

        return new ServiceResult(true, ADMIN_CREATE);
    }

    async SignIn(email, password) {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user ? user.password : ''))) {
            if (user.isLock == 1) {
                loggingEvent(user, 'SIGN_IN', 'USER', false, user._id, null, 'user is locked', null);
                return new ServiceResult(false, ACCOUNT_LOCKED);
            }
            if (user.activationCode != '' && user.activationCode !== undefined && user.activationCode !== null) {
                loggingEvent(user, 'SIGN_IN', 'USER', false, user._id, null, 'user is not activated', null);
                return new ServiceResult(false, ACCOUNT_NOT_ACTIVATED);
            }
            const jwt = authenticate.getToken(user);

            loggingEvent(user, 'SIGN_IN', 'USER', true, user._id, null, '', null);

            return new ServiceResult(true, '', { jwt, user });
        } else {
            loggingEvent(user, 'SIGN_IN', 'USER', false, email, null, '404', null);
            return new ServiceResult(false, ACCOUNT_INVALID);
        }
    }

    async SignUp(email, password) {
        if (validator.validate(email) === false) {
            return new ServiceResult(false, ACCOUNT_INVALID);
        }

        if (!password) {
            return new ServiceResult(false, ACCOUNT_INVALID);
        }

        const user = await User.findOne({ email });
        if (user) {
            loggingEvent(user, 'SIGN_UP', 'USER', false, email, null, EMAIL_EXITS, null);
            return new ServiceResult(false, EMAIL_EXITS);
        }

        const newUser = new User({ email });
        newUser.password = bcrypt.hashSync(password, 10);
        newUser.activationCode = Math.random().toString(36).slice(2);
        await newUser.save();

        loggingEvent(newUser, 'SIGN_UP', 'USER', true, email, null, '', newUser);

        // send email

        const activationLink = CLIENT_URL + `/auth/activation?activationCode=${newUser.activationCode}`;

        const html = activationMail(activationLink);

        await mailer.sendMail(email, 'Confirm your AudioBook account', html);
        return new ServiceResult(true, SEND_MAIL);
    }

    async Login(email, password) {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user ? user.password : ''))) {
            if (user.isLock == 1) {
                loggingEvent(user, 'ADMIN_LOGIN', 'USER', false, user._id, null, 'user is locked', null);
                return new ServiceResult(false, ACCOUNT_LOCKED);
            }
            if (user.activationCode != '' && user.activationCode !== undefined && user.activationCode !== null) {
                loggingEvent(user, 'ADMIN_LOGIN', 'USER', false, user._id, null, 'user is not activated', null);
                return new ServiceResult(false, ACCOUNT_NOT_ACTIVATED);
            }
            if (user.isAdmin == 0) {
                loggingEvent(user, 'ADMIN_LOGIN', 'USER', false, user._id, null, 'user is not admin', null);
                return new ServiceResult(false, USER_NOT_AUTHORIZED);
            }
            const jwt = authenticate.getToken(user);
            loggingEvent(user, 'ADMIN_LOGIN', 'USER', true, user._id, null, '', null);
            return new ServiceResult(true, '', { jwt, user });
        } else {
            loggingEvent(user, 'ADMIN_LOGIN', 'USER', false, user._id, null, '404', null);
            return new ServiceResult(false, ACCOUNT_INVALID);
        }
    }

    async ForgotPassword(email) {
        const user = await User.findOne({ email });
        if (!user) {
            return new ServiceResult(false, ACCOUNT_INVALID);
        }
        if (user.isLock == 1) {
            return new ServiceResult(false, ACCOUNT_LOCKED);
        }

        user.forgotPasswordCode = Math.random().toString(36).slice(2);
        await user.save();
        loggingEvent(user, 'UPDATE', 'USER', null, 'FORGOT_PASSWORD');
        // send email

        const resetPasswordLink = CLIENT_URL + `/auth/reset_password?forgotPasswordCode=${user.forgotPasswordCode}`;

        const html = forgotPasswordMail(resetPasswordLink);

        await mailer.sendMail(email, 'Reset Password your AudioBook account', html);
        return new ServiceResult(true, SEND_MAIL);
    }

    async CheckForgotPasswordCode(forgotPasswordCode) {
        const user = await User.findOne({ forgotPasswordCode });
        if (!forgotPasswordCode || !user) {
            return new ServiceResult(false, CODE_INVALID);
        }
        if (user.isLock == 1) {
            return new ServiceResult(false, ACCOUNT_LOCKED);
        }
        return new ServiceResult(true, '', { email: user.email });
    }

    async ResetPassword(forgotPasswordCode, password) {
        const user = await User.findOne({ forgotPasswordCode });
        if (!user) {
            return new ServiceResult(false, CODE_INVALID);
        }
        if (user.isLock == 1) {
            return new ServiceResult(false, ACCOUNT_LOCKED);
        }
        user.password = bcrypt.hashSync(password, 10);
        user.forgotPasswordCode = '';
        await user.save();
        loggingEvent(user, 'UPDATE', 'USER', null, 'RESET_PASSWORD');
        return new ServiceResult(true, PASSWORD_RESET);
    }

    async ReActivationAccount(email) {
        const user = await User.findOne({ email });
        if (!user) {
            return new ServiceResult(false, ACCOUNT_INVALID);
        }
        if (user.isLock == 1) {
            return new ServiceResult(false, ACCOUNT_LOCKED);
        }
        if (user.activationCode == '') {
            return new ServiceResult(false, ACCOUNT_ACTIVATED);
        }

        user.activationCode = Math.random().toString(36).slice(2);
        await user.save();
        // send email

        const activationLink = CLIENT_URL + `/auth/activation?activationCode=${user.activationCode}`;

        const html = activationMail(activationLink);

        await mailer.sendMail(email, 'Confirm your AudioBook account', html);
        return new ServiceResult(true, SEND_MAIL);
    }

    async ActivationAccount(activationCode) {
        const user = await User.findOne({ activationCode });
        if (!activationCode || !user) {
            return new ServiceResult(false, CODE_INVALID);
        }
        if (user.isLock == 1) {
            return new ServiceResult(false, ACCOUNT_LOCKED);
        }
        user.activationCode = '';
        await user.save();
        loggingEvent(user, 'UPDATE', 'USER', null, 'ACTIVATION_ACCOUNT');
        return new ServiceResult(true, ACCOUNT_ACTIVATED, { email: user.email });
    }
};
