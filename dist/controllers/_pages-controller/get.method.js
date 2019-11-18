"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chamber_1 = require("../../chamber");
function WelcomePage(request, response) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return response.render(chamber_1.pages.welcome, {});
    });
}
exports.WelcomePage = WelcomePage;
