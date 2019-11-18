import * as express from 'express';
import * as cors from 'cors';
import * as socket_io from 'socket.io';
import * as http from 'http';
import * as client_sessions from 'client-sessions';
// @ts-ignore
import * as express_device from 'express-device';
// @ts-ignore
import * as express_fileupload from 'express-fileupload';
// @ts-ignore
import * as body_parser from 'body-parser';
import {
  APP_SECRET,
  corsOptions,
  paths,
} from './chamber';
import * as templateEngine from './template-engine';
import { MainController } from './controllers/main.controller';



const PORT: string | number = process.env.PORT || 8000;
const app: express.Application = express();

app.use(express_fileupload({ safeFileNames: true, preserveExtension: true }));
app.use(express_device.capture());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static(paths.static));
app.use(client_sessions({
  cookieName: 'session',
  secret: APP_SECRET,
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
  (<any> request).io = io;
  next();
});

app.use('/', MainController);

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);
