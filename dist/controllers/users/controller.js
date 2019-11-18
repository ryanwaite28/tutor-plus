"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const GET = require("./methods/get");
const POST = require("./methods/post");
const PUT = require("./methods/put");
exports.UsersController = express.Router();
exports.UsersController.get('/check_session', GET.check_session);
exports.UsersController.get('/sign_out', GET.sign_out);
exports.UsersController.post('/', POST.sign_up);
exports.UsersController.put('/', PUT.sign_in);
