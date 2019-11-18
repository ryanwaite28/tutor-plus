import * as nunjucks from 'nunjucks';
import { paths } from './chamber';

export function installExpressApp(app: Express.Application) {
  nunjucks.configure(paths.html, {
    autoescape: true,
    express: app
  });
}

/* --- Emails --- */

export function SignedUp_EMAIL(data: any) {
  return nunjucks.render('emails/SignedUp.html', { data });
}

export function ContactUser_EMAIL(data: any) {
  return nunjucks.render('emails/ContactUser.html', { data });
}

export function PasswordReset_EMAIL(data: any) {
  return nunjucks.render('emails/PasswordReset.html', { data });
}

export function PasswordResetSuccess_EMAIL(data: any) {
  return nunjucks.render('emails/PasswordResetSuccess.html', { data });
}

export function NewReview_EMAIL(data: any) {
  return nunjucks.render('emails/NewReview.html', { data });
}
