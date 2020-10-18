import {Request} from 'express';
import path from 'path';
import multer from 'multer';

const config = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'upload'),
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, file: string) => void) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),

}

export default config;