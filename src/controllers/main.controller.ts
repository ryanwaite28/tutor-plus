import * as express from 'express';

import { PagesController } from './_pages-controller/pages.controller';
import { UsersController } from './users/users.controller';



export const MainController: express.Router = express.Router();

/** Mount Routers */

MainController.use('/', PagesController);

MainController.use(`/api/users`, UsersController);
