"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const GET = require("./get.method");
exports.PagesController = express.Router();
exports.PagesController.get('/', GET.WelcomePage);
