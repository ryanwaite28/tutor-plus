"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
function check_session(request, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (request.session.id) {
                const get_user = yield models_1.Users.findOne({ where: { id: request.session.you.id } });
                const user = get_user.dataValues;
                delete user.password;
                const session_id = request.session.id;
                return response.json({ online: true, session_id, user });
            }
            else {
                return response.json({ online: false });
            }
        }
        catch (e) {
            console.log('error: ', e);
            return response.json({ e, error: true });
        }
    });
}
exports.check_session = check_session;
function sign_out(request, response) {
    request.session.reset();
    return response.status(200).json({
        online: false,
        successful: true,
        message: 'Signed out successfully!'
    });
}
exports.sign_out = sign_out;
