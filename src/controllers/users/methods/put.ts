import * as Chamber from '../../../Chamber';
// @ts-ignore
import * as bcrypt from 'bcrypt-nodejs';
import { Request, Response } from 'express';
import {
  Users,
} from '../../../models';
import { Op, Model } from 'sequelize';

export async function sign_in(
  request: Request,
  response: Response,
) {
  if ((<any> request).session.id) {
    const userObj = { ...(<any> request).session.you };
    delete userObj.password;
    return response.status(400).json({
      error: true,
      message: 'Client already signed in',
      user: userObj,
    });
  }

  let email = request.body.email;
  const password = request.body.password;

  if (email) {
    email = email.toLowerCase();
  }
  if (!email) {
    return response.status(400).json({
      error: true,
      message: 'Email Address field is required'
    });
  }
  if (!password) {
    return response.status(400).json({ error: true, message: 'Password field is required' });
  }
  const check_account = await (<any> Users).findOne({
    where: { [Op.or]: [{ email }, { username: email }] }
  });
  if (!check_account) {
    return response.status(400).json({ error: true, message: 'Invalid credentials.' });
  }
  if (bcrypt.compareSync(password, (<any> check_account).dataValues.password) === false) {
    return response.status(400).json({ error: true, message: 'Invalid credentials.' });
  }
  const user = (<any> check_account).dataValues;
  (<any> request).session.id = Chamber.uniqueValue();
  (<any> request).session.you = { ...user };
  (<any> request).session.youModel = check_account;
  delete user.password;

  return response.status(200).json({
    user,
    online: true,
    message: 'Signed In!'
  });
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
