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
