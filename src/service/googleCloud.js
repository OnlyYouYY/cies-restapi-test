import { Storage } from "@google-cloud/storage";

import multer from "multer";

const multerStorage = multer.memoryStorage();
export const multerUpload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

const storage = new Storage({
  keyFilename: './credentials/resonant-gizmo-385515-0aee8c39402d.json',
  projectId: 'resonant-gizmo-385515'
});


export const uploadImageToStorage = async (file) => {
    const bucketName = 'cies-app';
    const folderName = 'servicios';
    const bucket = storage.bucket(bucketName);
  
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const fileOptions = {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        contentType: file.mimetype
      }
    };
  
    const uploadTask = bucket.file(`${folderName}/${uniqueFileName}`).createWriteStream(fileOptions);
  
    return new Promise((resolve, reject) => {
      uploadTask.on('error', (error) => {
        reject(error);
      });
  
      uploadTask.on('finish', () => {
        const imageUrl = `https://storage.googleapis.com/${bucketName}/${folderName}/${uniqueFileName}`;
        resolve(imageUrl);
      });
  
      uploadTask.end(file.buffer);
    });
  };
  