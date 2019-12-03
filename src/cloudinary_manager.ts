import * as cloudinary from 'cloudinary';
import * as fs from 'fs';
import { uniqueValue } from './chamber';

export function upload_file(file: any) {
  return new Promise((resolve, reject) => {
    const unique_filename = uniqueValue();
    const filename = unique_filename + file.name;
    const image_path = __dirname + '/' + filename;
    file.mv(filename, (error: any) => {
      if (error) {
        return reject({error: true, message: 'could not upload file...'});
      } else {
        return resolve({ filename, image_path });
      }
    });
  });
}

export function upload_image(file: any, public_id: string) {
  return new Promise((resolve, reject) => {
    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
    const api_key = process.env.CLOUDINARY_API_KEY;
    const api_secret = process.env.CLOUDINARY_API_SECRET;

    const oneCredentialMissing = (!cloud_name || !api_key || !api_secret);

    if (oneCredentialMissing) {
      console.log({ file, public_id, cloud_name, api_key, api_secret });
      const errorObj = { msg: `One cloudinary credential is missing; upload attempt canceled.` };
      return reject(errorObj);
    }

    upload_file(file).then((filedata: any) => {
      (<any> cloudinary).config({ cloud_name, api_key, api_secret });

      if (public_id) {
        cloudinary.v2.uploader.destroy(public_id, (error, result) => {
          if (error) { console.log(error); }
          console.log(
            'deleted from cloudinary successfully!',
            'public_id: ' + public_id,
            'result: ', result
          );
        });
      }

      (<any> cloudinary).uploader.upload(filedata.filename, (result: any) => {
        fs.unlink(filedata.filename, (err) => {
          if (err) { console.log(err); }
          console.log(
            'file deleted successfully!',
            filedata.filename
          );
        });
        return result && result.secure_url ?
          resolve({ result, filedata }) :
          reject({ error: result });
      });
    })
    .catch((error: any) => {
      reject({ e: error, error: true });
    });
  });
}
