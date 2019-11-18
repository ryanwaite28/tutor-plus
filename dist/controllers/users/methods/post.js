"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Chamber = require("../../../chamber");
const bcrypt = require("bcrypt-nodejs");
const models_1 = require("../../../models");
function sign_up(request, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (request.session.id) {
            return response.status(400).json({ error: true, message: 'Client already signed in' });
        }
        const displayname = request.body.displayname;
        let username = request.body.username;
        let email = request.body.email;
        let password = request.body.password;
        const confirmPassword = request.body.confirmPassword;
        if (email) {
            email = email.toLowerCase().trim();
        }
        if (username) {
            username = username.toLowerCase().trim();
        }
        if (!displayname) {
            return response.status(400).json({ error: true, message: 'Display Name field is required' });
        }
        if (!username) {
            return response.status(400).json({ error: true, message: 'Username field is required' });
        }
        if (!email) {
            return response.status(400).json({ error: true, message: 'Email Address field is required' });
        }
        if (!password) {
            return response.status(400).json({ error: true, message: 'Password field is required' });
        }
        if (!confirmPassword) {
            return response.status(400).json({ error: true, message: 'Confirm Password field is required' });
        }
        if (!Chamber.validateDisplayName(displayname)) {
            return response.status(400).json({
                error: true,
                message: 'Display name must be letters only, 2-50 characters long. Spaces, dashes and apostrophes are allowed'
            });
        }
        if (!Chamber.validateUsername(username)) {
            return response.status(400).json({
                error: true,
                message: 'Username must be letters and numbers only, 2-50 characters long. Dashes and underscores are allowed'
            });
        }
        if (!Chamber.validateEmail(email)) {
            return response.status(400).json({ error: true, message: 'Email is invalid. Check Format.' });
        }
        if (!Chamber.validatePassword(password)) {
            return response.status(400).json({
                error: true,
                message: 'Password must be: at least 7 characters, upper and/or lower case alphanumeric'
            });
        }
        if (password !== confirmPassword) {
            return response.status(400).json({ error: true, message: 'Passwords must match' });
        }
        const check_username = yield models_1.Users.findOne({ where: { username } });
        if (check_username) {
            return response.status(401).json({ error: true, message: 'Username already in use' });
        }
        const check_email = yield models_1.Users.findOne({ where: { email } });
        if (check_email) {
            return response.status(401).json({ error: true, message: 'Email already in use' });
        }
        password = bcrypt.hashSync(password);
        const new_user = yield models_1.Users.create({ displayname, username, email, password });
        const user = new_user.dataValues;
        request.session.id = Chamber.uniqueValue();
        request.session.you = Object.assign({}, user);
        request.session.youModel = new_user;
        delete user.password;
        return response.status(200).json({ online: true, user, message: 'Signed Up!' });
    });
}
exports.sign_up = sign_up;
function sign_out(request, response) {
    request.session.reset();
    return response.status(200).json({
        online: false,
        successful: true,
        message: 'Signed out successfully!'
    });
}
exports.sign_out = sign_out;
