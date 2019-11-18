import { Request, Response } from 'express';
import * as express from 'express';

import { PagesController } from './_pages-controller/pages.controller';
import { UsersController } from './users/controller';




export const MainController: express.Router = express.Router();

/** Mount Routers */

MainController.use('/', PagesController);

MainController.use(`/users`, UsersController);
