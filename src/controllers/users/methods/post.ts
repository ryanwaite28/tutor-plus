import * as Chamber from '../../../chamber';
// @ts-ignore
import * as bcrypt from 'bcrypt-nodejs';
import { Request, Response } from 'express';
import {
  Users
} from '../../../models';

export async function sign_up(
  request: Request,
  response: Response,
) {
  if ((<any> request).session.id) {
    return response.status(400).json({ error: true, message: 'Client already signed in' });
  }

  const displayname = request.body.displayname;
  let username = request.body.username;
  let email = request.body.email;
  let password = request.body.password;
  const confirmPassword = request.body.confirmPassword;

  if (email) { email = email.toLowerCase().trim(); }
  if (username) { username = username.toLowerCase().trim(); }

  if (!displayname) {
    return response.status(400).json({ error: true, message: 'Display Name field is required' });
  }
  if (!username) {
    return response.status(400).json({ error: true, message: 'Username field is required' });
  }
  if (!email) {
    return response.status(400).json({ error: true, message: 'Email Address field is required' });
  }
  if (!password) {
    return response.status(400).json({ error: true, message: 'Password field is required' });
  }
  if (!confirmPassword) {
    return response.status(400).json({ error: true, message: 'Confirm Password field is required' });
  }

  if (!Chamber.validateDisplayName(displayname)) {
    return response.status(400).json({
      error: true,
      message: 'Display name must be letters only, 2-50 characters long. Spaces, dashes and apostrophes are allowed'
    });
  }
  if (!Chamber.validateUsername(username)) {
    return response.status(400).json({
      error: true,
      message: 'Username must be letters and numbers only, 2-50 characters long. Dashes and underscores are allowed'
    });
  }
  if (!Chamber.validateEmail(email)) {
    return response.status(400).json({ error: true, message: 'Email is invalid. Check Format.' });
  }
  if (!Chamber.validatePassword(password)) {
    return response.status(400).json({
      error: true,
      message: 'Password must be: at least 7 characters, upper and/or lower case alphanumeric'
    });
  }
  if (password !== confirmPassword) {
    return response.status(400).json({ error: true, message: 'Passwords must match' });
  }

  const check_username = await (<any> Users).findOne({ where: { username } });
  if (check_username) {
    return response.status(401).json({ error: true, message: 'Username already in use' });
  }

  const check_email = await (<any> Users).findOne({ where: { email } });
  if (check_email) {
    return response.status(401).json({ error: true, message: 'Email already in use' });
  }

  /* Data Is Valid */

  password = bcrypt.hashSync(password);
  const new_user = await (<any> Users).create({ displayname, username, email, password });
  const user = (<any> new_user).dataValues;
  (<any> request).session.id = Chamber.uniqueValue();
  (<any> request).session.you = { ...user };
  (<any> request).session.youModel = new_user;
  delete user.password;

  /** Email Sign up and verify */
  // const host: string | undefined = request.get('host');
  // const uuid = user.uuid;
  // const verify_link = (<string> host).endsWith('/')
  //   ? (host + 'verify_user_email/' + uuid)
  //   : (host + '/verify_user_email/' + uuid);

  // const email_subject = 'Hot Spot - Signed Up!';
  // const email_html = templateEngine.SignedUp_EMAIL(request.session.you);
  // sendgrid_manager.send_email(null, user.email, email_subject, email_html);

  return response.status(200).json({ online: true, user, message: 'Signed Up!' });
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
