"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks = require("nunjucks");
const chamber_1 = require("./chamber");
function installExpressApp(app) {
    nunjucks.configure(chamber_1.paths.html, {
        autoescape: true,
        express: app
    });
}
exports.installExpressApp = installExpressApp;
function SignedUp_EMAIL(data) {
    return nunjucks.render('emails/SignedUp.html', { data });
}
exports.SignedUp_EMAIL = SignedUp_EMAIL;
function ContactUser_EMAIL(data) {
    return nunjucks.render('emails/ContactUser.html', { data });
}
exports.ContactUser_EMAIL = ContactUser_EMAIL;
function PasswordReset_EMAIL(data) {
    return nunjucks.render('emails/PasswordReset.html', { data });
}
exports.PasswordReset_EMAIL = PasswordReset_EMAIL;
function PasswordResetSuccess_EMAIL(data) {
    return nunjucks.render('emails/PasswordResetSuccess.html', { data });
}
exports.PasswordResetSuccess_EMAIL = PasswordResetSuccess_EMAIL;
function NewReview_EMAIL(data) {
    return nunjucks.render('emails/NewReview.html', { data });
}
exports.NewReview_EMAIL = NewReview_EMAIL;
