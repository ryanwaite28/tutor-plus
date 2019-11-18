"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_io = require("socket.io");
const http = require("http");
const client_sessions = require("client-sessions");
const express_device = require("express-device");
const express_fileupload = require("express-fileupload");
const body_parser = require("body-parser");
const chamber_1 = require("./chamber");
const templateEngine = require("./template-engine");
const main_controller_1 = require("./controllers/main.controller");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express_fileupload({ safeFileNames: true, preserveExtension: true }));
app.use(express_device.capture());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static(chamber_1.paths.static));
app.use(client_sessions({
    cookieName: 'session',
    secret: chamber_1.APP_SECRET,
    duration: 5 * 30 * 60 * 1000,
    activeDuration: 2 * 5 * 60 * 1000,
    cookie: {
        httpOnly: false,
        secure: false,
    }
}));
templateEngine.installExpressApp(app);
const server = http.createServer(app);
const io = socket_io(server);
io.on('connection', (socket) => {
    console.log('new socket:', socket);
});
app.use((request, response, next) => {
    request.io = io;
    next();
});
app.use('/', main_controller_1.MainController);
server.listen(PORT);
console.log(`Listening on port ${PORT}...`);
