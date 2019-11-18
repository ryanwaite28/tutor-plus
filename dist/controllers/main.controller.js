"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const pages_controller_1 = require("./_pages-controller/pages.controller");
const controller_1 = require("./users/controller");
exports.MainController = express.Router();
exports.MainController.use('/', pages_controller_1.PagesController);
exports.MainController.use(`/users`, controller_1.UsersController);
