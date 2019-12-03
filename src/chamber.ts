import * as path from 'path';
import { CorsOptions } from 'cors';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

export const APP_SECRET: string = 'f6evg7h8j9rrnhcw8e76@$#%RFG&*BF^&G*O(Pxjt678yu';
export const specialCaracters: string[] = ['!', '@', '#', '$', '%', '&', '+', ')', ']', '}', ':', ';', '?'];
export const allowed_images: string[] = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

export const static_dir: string = path.resolve(__dirname, '../static');
export const img_dir: string = path.join(static_dir, 'img/');
export const css_dir: string = path.join(static_dir, 'css/');
export const html_dir: string = path.join(static_dir, 'html/');

export const paths: { [key: string]: string; } = {
  static: static_dir,
  img: img_dir,
  css: css_dir,
  html: html_dir,
};

export const pages: { [key: string]: string; } = {
  _error: '_error.html',
  welcome: 'welcome.html',
  signup: 'signup.html',
  signin: 'signin.html',
  userPage: 'user-page.html',
};

export enum Event_Types {
  LIKE = 'LIKE',
}

export enum Notification_Target_Types {
  USER = 'USER',
}

export enum Content_Types {
  LIVE_SESSION = 'LIVE_SESSION',
  TUTORIAL = 'TUTORIAL',
  QNA = 'QNA',
}



/* --- */

export function addDays(dateObj: Date, number_of_days: number) {
  const dat = new Date(dateObj.valueOf());
  dat.setDate(dat.getDate() + number_of_days);
  return dat;
}

export function backDays(dateObj: Date, number_of_days: number) {
  const dat = new Date(dateObj.valueOf());
  dat.setDate(dat.getDate() - number_of_days);
  return dat;
}

export function validateEmail(email: string) {
  if (!email) { return false; }
  if (email.constructor !== String) { return false; }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function validateName(name: string) {
  if (!name) { return false; }
  if (name.constructor !== String) { return false; }
  const re = /^[a-zA-Z]{2,50}$/;
  return re.test(name.toLowerCase());
}

export function validateDisplayName(value: any): boolean {
  if (!value) { return false; }
  if (value.constructor !== String) { return false; }
  const re = /^[a-zA-Z\s\'\-\_\.]{2,50}$/;
  return re.test(value.toLowerCase());
}

export function validateUsername(value: any): boolean {
  if (!value) { return false; }
  if (value.constructor !== String) { return false; }
  const re = /^[a-zA-Z0-9\-\_]{2,50}$/;
  return re.test(value.toLowerCase());
}

export function validateURL(value: any): boolean {
  if (!value) { return false; }
  if (value.constructor !== String) { return false; }
  const re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return re.test(value.toLowerCase());
}

export function validateInteger(value: any): boolean {
  if (!value) { return false; }
  if (value.constructor !== Number) { return false; }
  const re = /^[0-9]+$/;
  return re.test(value);
}

export function validatePassword(password: string) {
  if (!password) { return false; }
  if (password.constructor !== String) { return false; }

  const hasMoreThanSixCharacters = password.length > 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);

  return (
    hasMoreThanSixCharacters
    && (hasUpperCase || hasLowerCase)
    && hasNumbers
  );
}

export function uniqueValue() {
  return String(Date.now()) +
    Math.random().toString(36).substr(2, 34) +
    Math.random().toString(36).substr(2, 34) +
    Math.random().toString(36).substr(2, 34) +
    Math.random().toString(36).substr(2, 34);
}

export function capitalize(str: string) {
  const Str = str.toLowerCase();
  return Str.charAt(0).toUpperCase() + Str.slice(1);
}

export function getRandomIndex(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomString(num: number = 1) {
  let str = '';
  if (typeof (num) !== 'number') {
    num = 1;
  }
  for (let i = 0; i < num; i++) {
    str = str + Math.random().toString(36).substr(2, 34);
  }
  return str;
}

export function generateRandomSpecialString(num = 1) {
  let str = '';
  if (typeof (num) !== 'number') {
    num = 1;
  }
  for (let i = 0; i < num; i++) {
    str = str + Math.random().toString(36).substr(2, 34) + getRandomIndex(specialCaracters);
  }
  return str;
}

export function GetSessionRequired(request: Request, response: Response, next: NextFunction) {
  (async () => {
    if (!(<any> request).session.id) {
      return (<any> response).status(401).json({
        error: true,
        message: 'Not signed in'
      });
    } else {
      return next();
    }
  })();
}

export function PageSessionRequired(request: Request, response: Response, next: NextFunction) {
  (async () => {
    if (!(<any> request).session.id) {
      return response.render(pages.error, { message: `No user logged in.` });
    } else {
      return next();
    }
  })();
}

export const whitelist_domains = [
  // dev origins
  'http://localhost:7600',
  'http://localhost:9500',

  // prod origins
  '',
];

export const corsOptions: CorsOptions = {
  // https://expressjs.com/en/resources/middleware/cors.html
  origin(origin: string | undefined, callback: any) {
    const originIsAllowed = whitelist_domains.includes((origin as string));
    console.log({
      origin,
      originIsAllowed,
    });

    if (!origin) {
      callback(new Error('Not allowed by CORS'));
      return;
    }
    if (originIsAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
