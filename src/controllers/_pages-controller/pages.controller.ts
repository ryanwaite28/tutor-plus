import * as express from 'express';
import * as GET from './get.method';

export const PagesController: express.Router = express.Router();


PagesController.get('/', GET.WelcomePage);
PagesController.get('/signup', GET.SignupPage);
PagesController.get('/signin', GET.SigninPage);
