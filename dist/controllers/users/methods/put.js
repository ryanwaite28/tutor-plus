"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Chamber = require("../../../Chamber");
const bcrypt = require("bcrypt-nodejs");
const models_1 = require("../../../models");
const sequelize_1 = require("sequelize");
function sign_in(request, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (request.session.id) {
            const userObj = Object.assign({}, request.session.you);
            delete userObj.password;
            return response.status(400).json({
                error: true,
                message: 'Client already signed in',
                user: userObj,
            });
        }
        let email = request.body.email;
        const password = request.body.password;
        if (email) {
            email = email.toLowerCase();
        }
        if (!email) {
            return response.status(400).json({
                error: true,
                message: 'Email Address field is required'
            });
        }
        if (!password) {
            return response.status(400).json({ error: true, message: 'Password field is required' });
        }
        const check_account = yield models_1.Users.findOne({
            where: { [sequelize_1.Op.or]: [{ email }, { username: email }] }
        });
        if (!check_account) {
            return response.status(400).json({ error: true, message: 'Invalid credentials.' });
        }
        if (bcrypt.compareSync(password, check_account.dataValues.password) === false) {
            return response.status(400).json({ error: true, message: 'Invalid credentials.' });
        }
        const user = check_account.dataValues;
        request.session.id = Chamber.uniqueValue();
        request.session.you = Object.assign({}, user);
        request.session.youModel = check_account;
        delete user.password;
        return response.status(200).json({
            user,
            online: true,
            message: 'Signed In!'
        });
    });
}
exports.sign_in = sign_in;
function sign_out(request, response) {
    request.session.reset();
    return response.status(200).json({
        online: false,
        successful: true,
        message: 'Signed out successfully!'
    });
}
exports.sign_out = sign_out;
