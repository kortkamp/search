import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';

interface IUploadReturn {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: '';
    s3: {
      bucket: string;
    };
  };
}

export default function upload(containerName?: string): IUploadReturn {
  const storageDriver = process.env.STORAGE_DRIVER === 's3' ? 's3' : 'disk';
  const driver = storageDriver;

  const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

  let uploadsFolder = resolve(tmpFolder, 'uploads');

  let bucket: string;

  switch (containerName) {
    case 'avatar':
      uploadsFolder = resolve(
        __dirname,
        '..',
        '..',
        'tmp',
        'uploads',
        'avatar',
      );
      bucket = 'avatar-apae';
      break;

    case undefined:
      bucket = containerName;
      break;

    default:
      uploadsFolder = resolve(
        __dirname,
        '..',
        '..',
        'tmp',
        'uploads',
        containerName,
      );
      bucket = containerName;
  }

  return {
    driver,
    tmpFolder,
    uploadsFolder,
    multer: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');

          const originalName = Buffer.from(
            file.originalname,
            'latin1',
          ).toString('utf8');

          const fileName = `${fileHash}-${originalName
            .toLowerCase()
            .replace(/\s/g, '')}`;

          return callback(null, fileName);
        },
      }),
    },
    config: {
      disk: '',
      s3: {
        bucket,
      },
    },
  };
}
