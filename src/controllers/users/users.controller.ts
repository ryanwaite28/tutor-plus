import * as express from 'express';

// @ts-ignore
import * as GET from './methods/get';
// @ts-ignore
import * as POST from './methods/post';
// @ts-ignore
import * as PUT from './methods/put';
// @ts-ignore
import * as DELETE from './methods/delete';

import { GetSessionRequired } from '../../chamber';


export const UsersController: express.Router = express.Router();

/** GET routes */

UsersController.get('/check_session', GET.check_session);
UsersController.get('/sign_out', GET.sign_out);
UsersController.get('/:id', GET.getUserById);
UsersController.get('/:id/profile-info', GET.getUserProfileInfoById);
UsersController.get('/:id/follows/:user_id', GET.checkUserFollows);


/** POST routes */

UsersController.post('/', POST.sign_up);

/** PUT routes */

UsersController.put('/', PUT.sign_in);
UsersController.put('/settings', GetSessionRequired, PUT.update_settings);
UsersController.put('/:id/follows/:user_id', GetSessionRequired, PUT.toggleUserFollows);

/** DELETE routes */

