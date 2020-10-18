import {Request} from 'express';
import path      from 'path';
import multer    from 'multer';

const filenameCallback = (req: Request, file: Express.Multer.File, cb: (error: Error | null, file: string) => void) => {
  const filename = `${Date.now()}-${file.originalname}`;
  cb(null, filename);
}

const config = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'upload'),
    filename: filenameCallback,
  }),

}

export default config;