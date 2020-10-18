import {Router} from "express";
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanageController from './controller/OrphanageController';

import {CreateOrphanateValidator, ShowOrphanateValidator} from './validators/OrphanateValidator';

const upload = multer(uploadConfig);

const orphanageController = new OrphanageController();
const routes              = Router();

routes.get('/orphanage', orphanageController.index);
routes.get('/orphanage/:id', ShowOrphanateValidator, orphanageController.show);

routes.post('/orphanage', upload.array('images'), CreateOrphanateValidator, orphanageController.create);

export default routes;