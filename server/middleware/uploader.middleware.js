import multer from 'multer';

const memoryStorage = multer.memoryStorage();

export const uploader = multer({storage: memoryStorage})