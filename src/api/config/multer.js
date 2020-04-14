'use strict';
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes =  {
  local: multer.diskStorage({
    destination: (req, file, cb)  => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) {
          cb(error);
        }
        file.key = `${hash.toString('hex')}-${file.originalName}`;
        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'smartcookprofile',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) =>
    {
      crypto.randomBytes(16, (error, hash) => {
        if (error) {
          cb(error);
        }
        const filename = `${hash.toString('hex')}-${file.originalName}`;
        cb(null, filename);
      })
    },
  })
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: storageTypes["local"],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg ',
      'image/png',
      'image/gif',
      'image/pjpeg'
    ];

    if (allowedMimes.includes(file.mimeType)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
}
