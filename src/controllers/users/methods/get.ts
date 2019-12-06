import * as Chamber from '../../../chamber';
import {
  Users,
  Follows,
  UserRatings,
} from '../../../models';
import { Request, Response } from 'express';
import { fn, col } from 'sequelize';

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
  return response.status(200).json({
    online: false,
    successful: true,
    message: 'Signed out successfully!'
  });
}

export async function getUserById(
  request: Request,
  response: Response,
) {
  const id = parseInt(request.params.id, 10);
  const userModel = await (<any> Users).findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  return response.status(200).json({ user: userModel });
}

export async function getUserProfileInfoById(
  request: Request,
  response: Response,
) {
  const id = parseInt(request.params.id, 10);

  const userModel = await (<any> Users).findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  const userFollowings = await (<any> Follows).findOne({
    where: { user_id: id },
    attributes: [
      [fn('COUNT', col('user_id')), 'userFollowingsCount'],
    ],
    group: ['user_id'],
  });
  const userFollowers = await (<any> Follows).findOne({
    where: { follows_id: id },
    attributes: [
      [fn('COUNT', col('follows_id')), 'userFollowersCount'],
    ],
    group: ['follows_id'],
  });
  const ratings_info = await (<any> UserRatings).findOne({
    where: { user_id: id },
    attributes: [
      [fn('AVG', col('rating')), 'ratingsAvg'],
      [fn('COUNT', col('rating')), 'ratingsCount'],
    ],
    group: ['user_id'],
  });

  return response.status(200).json({
    user: userModel,
    userFollowings,
    userFollowers,
    ratings_info,
  });
}

export async function checkUserFollows(
  request: Request,
  response: Response,
) {
  const userA_id = parseInt(request.params.id, 10);
  const userB_id = parseInt(request.params.user_id, 10);

  const checkFollow = await (<any> Follows).findOne({
    where: { user_id: userA_id, follows_id: userB_id },
  });

  return response.status(200).json({
    follows: checkFollow
  });
}
