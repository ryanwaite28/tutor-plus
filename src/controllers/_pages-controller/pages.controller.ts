import * as express from 'express';
import * as GET from './get.method';

export const PagesController: express.Router = express.Router();


PagesController.get('/', GET.WelcomePage);
