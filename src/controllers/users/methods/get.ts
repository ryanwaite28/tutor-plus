import * as Chamber from '../../../chamber';
import {
  Users,
} from '../../../models';
import { Request, Response } from 'express';

export async function check_session(
  request: Request,
  response: Response,
) {
  try {
    if ((<any> request).session.id) {
      const user = { ...(<any> request).session.you };
      delete user.password;
      const session_id = (<any> request).session.id;
      return response.json({ online: true, session_id, user });
    } else {
      return response.json({ online: false });
    }
  } catch (e) {
    console.log('error: ', e);
    return response.json({ e, error: true });
  }
}

export function sign_out(
  request: Request,
  response: Response,
) {
  (<any> request).session.reset();
  // return response.status(200).json({
  //   online: false,
  //   successful: true,
  //   message: 'Signed out successfully!'
  // });
  console.log(request);
  return response.redirect('/signin');
}

export async function getUserById(
  request: Request,
  response: Response,
) {
  const id = parseInt(request.params.id, 10);
  const userModel = await (<any> Users).findOne({
    where: { id },
    attributes: [
      'id',
      'displayname',
      'username',
      'email',
      'icon_link',
      'phone',
      'bio',
      'location',
      'uuid',
      'date_created',
      'public',
      'verified',
      'certified',
    ],
  });

  return response.status(200).json({ user: userModel });
}
