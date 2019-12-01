import { pages } from '../../chamber';
import {
  Users,
} from '../../models';
import { Request, Response } from 'express';

export async function WelcomePage(
  request: Request,
  response: Response,
) {
  return response.render(pages.welcome, {});
}

export async function SigninPage(
  request: Request,
  response: Response,
) {
  return response.render(pages.signin, {});
}

export async function SignupPage(
  request: Request,
  response: Response,
) {
  return response.render(pages.signup, {});
}

export async function UserPage(
  request: Request,
  response: Response,
) {
  const id = parseInt(request.params.id, 10) || -1;
  const userModel = await (<any> Users).findOne({ where: { id } });
  const user = userModel && userModel.get({ plain: true }) || {};
  return response.render(pages.userPage, { user });
}