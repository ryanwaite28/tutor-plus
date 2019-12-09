import * as Chamber from '../../../Chamber';
// @ts-ignore
import * as bcrypt from 'bcrypt-nodejs';
import { Request, Response } from 'express';
import {
  Users, Follows, Notifications,
} from '../../../models';
import { Op, Model } from 'sequelize';
import { UploadedFile } from 'express-fileupload';
import { upload_image } from '../../../cloudinary_manager';

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
  const user = (<any> check_account).get({ plain: true });
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

export async function update_settings(
  request: Request,
  response: Response,
) {
  const you = (<any> request).session.you;
  const id = parseInt(request.params.id, 10);
  if (id !== you.id) {
    return response.status(400).json({
      error: true,
      message: 'Cannot update another user\'s profile'
    });
  }
  const youModel = await (<any> Users).findOne({ where: { id: you.id } });
  const data = request.body;
  const files = request.files || {};

  if (!data.displayname) {
    return response.status(400).json({
      error: true,
      message: 'Display Name field is required'
    });
  }
  if (!data.username) {
    return response.status(400).json({
      error: true,
      message: 'Username field is required'
    });
  }
  if (!data.email) {
    return response.status(400).json({
      error: true,
      message: 'Email Address field is required'
    });
  }
  if (!Chamber.validateDisplayName(data.displayname)) {
    return response.status(400).json({
      error: true,
      message: 'Display name must be letters only, 2-50 characters long. Spaces, dashes and apostrophes are allowed'
    });
  }
  if (!Chamber.validateUsername(data.username)) {
    return response.status(400).json({
      error: true,
      message: 'Username must be letters and numbers only, 2-50 characters long. Dashes and underscores are allowed'
    });
  }
  if (!Chamber.validateEmail(data.email)) {
    return response.status(400).json({
      error: true,
      message: 'Email is invalid. Check Format.'
    });
  }

  data.email = data.email.toLowerCase().trim();
  data.username = data.username.toLowerCase().trim();


  const updatesObj: { [key: string]: any } = {};

  updatesObj.displayname = data.displayname;
  updatesObj.bio = data.bio;
  updatesObj.tags = data.tags;
  updatesObj.subjects = data.subjects;
  updatesObj.phone = data.phone;
  updatesObj.location = data.location;
  updatesObj.zoomlink = data.zoomlink;
  updatesObj.link_text = data.link_text;
  updatesObj.link_href = data.link_href;

  if (data.hasOwnProperty('available')) {
    updatesObj.available = data.available;
  }
  if (data.hasOwnProperty('public')) {
    updatesObj.public = data.public;
  }
  if (data.hasOwnProperty('online')) {
    updatesObj.online = data.online;
  }

  if (you.username !== data.username) {
    const check_username = await (<any> Users).findOne({ where: { username: data.username } });
    if (check_username) {
      return response.status(401).json({ error: true, message: 'Username already in use' });
    }
    updatesObj.username = data.username;
  }

  if (you.email !== data.email) {
    const check_email = await (<any> Users).findOne({ where: { email: data.email } });
    if (check_email) {
      return response.status(401).json({ error: true, message: 'Email already in use' });
    }
    updatesObj.email = data.email;
  }

  const oneOfThePasswordFieldsHasValue = (
    data.oldpassword || data.password || data.confirmPassword
  );
  if (oneOfThePasswordFieldsHasValue) {
    const allOfThePasswordFieldsHasValue = (
      data.oldpassword && data.password && data.confirmPassword
    );
    if (!allOfThePasswordFieldsHasValue) {
      return response.status(400).json({
        error: true,
        message: 'All password fields are required to change password. ' +
          'If you do not want to change your current password, leave all password fields empty.'
      });
    }
    if (bcrypt.compareSync(data.oldpassword, (<any> youModel).dataValues.password) === false) {
      return response.status(400).json({ error: true, message: 'Old password input is invalid.' });
    }
    if (!Chamber.validatePassword(data.password)) {
      return response.status(400).json({
        error: true,
        message: 'Password must be: at least 7 characters, upper and/or lower case alphanumeric'
      });
    }
    if (data.password !== data.confirmPassword) {
      return response.status(400).json({ error: true, message: 'Passwords must match' });
    }
    updatesObj.password = bcrypt.hashSync(data.password);
  }

  if (files.icon) {
    const iconImageType = (<UploadedFile> files.icon).mimetype.split('/')[1];
    if (!Chamber.allowed_images.includes(iconImageType)) {
      return response.status(400).json({ error: true, message: 'Icon is invalid file type: jpg, jpeg or png required...' });
    }
    try {
      const iconImgData: any = await upload_image(files.icon, you.icon_id);
      updatesObj.icon_link = iconImgData.result.secure_url;
      updatesObj.icon_id = iconImgData.result.public_id;
    } catch (e) {
      console.log(e);
      return response.status(500).json({ error: true, message: 'Could not process icon image...' });
    }
  }

  if (files.wallpaper) {
    const wallpaperImageType = (<UploadedFile> files.wallpaper).mimetype.split('/')[1];
    if (!Chamber.allowed_images.includes(wallpaperImageType)) {
      return response.status(400).json({ error: true, message: 'Wallpaper is invalid file type: jpg, jpeg or png required...' });
    }
    try {
      const wallpaperImgData: any = await upload_image(files.wallpaper, you.wallpaper_id);
      updatesObj.wallpaper_link = wallpaperImgData.result.secure_url;
      updatesObj.wallpaper_id = wallpaperImgData.result.public_id;
    } catch (e) {
      console.log(e);
      return response.status(500).json({ error: true, message: 'Could not process wallpaper image...' });
    }
  }

  const update = await (<any> Users).update(updatesObj, { where: { id: you.id } });
  console.log({ update });
  Object.assign((<any> request).session.you, updatesObj);
  delete (<any> request).session.you.password;

  const eventName = Chamber.getUserEventListenerName((<any> request).session.you);
  (<any> request).io.emit(eventName, {
    eventType: Chamber.EventTypes.USER_PROFILE_UPDATED,
    user: (<any> request).session.you,
  });

  return response.status(200).json({
    user: (<any> request).session.you,
    message: `Updates saves successfully.`
  });
}

export async function toggleUserFollows(
  request: Request,
  response: Response,
) {
  const you = { ...(<any> request).session.you };
  delete you.password;
  const id = parseInt(request.params.id, 10);
  if (id !== you.id) {
    return response.status(400).json({
      error: true,
      message: 'User not involved in follow request: did not initiate.'
    });
  }
  const user_id = parseInt(request.params.user_id, 10);

  const userModel = await (<any> Users).findOne({ where: { id: user_id } });
  const user = (<any> userModel).get({ plain: true });
  const checkFollow = await (<any> Follows).findOne({ where: { user_id: you.id, follows_id: user_id } });

  if (checkFollow) {
    // if is following or sent request to follow, delete it.
    const followInfo = (<any> checkFollow).get({ plain: true });
    await (<any> checkFollow).destroy();
    return response.status(200).json({
      message: followInfo.status ? 'Canceled follow request' : 'Unfollowed',
      follows: null,
    });
  } else {
    // else, create it
    const followModel = await (<any> Follows).create({
      user_id: you.id,
      follows_id: user_id,
      status: !user.public ? 'pending' : '',
    });
    // create the notification
    const newNotification = await (<any> Notifications).create({
      from_id: you.id,
      to_id: user.id,
      action: !user.public ? Chamber.NotificationTypes.FOLLOW_REQUEST : Chamber.NotificationTypes.FOLLOW,
      target_type: Chamber.NotificationTargetTypes.USER,
      target_id: user.id,
      message: 'started following you',
      link: '',
    });
    // notify the user by emiting the notification
    const eventName = Chamber.getUserEventListenerName(user);
    (<any> request).io.emit(eventName, {
      eventType: Chamber.EventTypes.NEW_NOTIFICATION,
      message: !user.public ? `${you.username} requested to follow you` : `${you.username} started following you`,
      notification: {
        ...(<any> newNotification).get({ plain: true }),
        user: you,
      },
    });

    return response.status(200).json({
      message: !user.public ? 'Follow requested' : 'Followed',
      follows: followModel
    });
  }
}
