import {Request, Response} from "express";
import {validationResult}  from 'express-validator';
import {getRepository}     from "typeorm";

import Orphanage     from "../model/Orphanage";
import OrphanageView from "../view/OrphanageView";

class OrphanageController {

  async index(req: Request, res: Response){
    const orphanageRep = getRepository(Orphanage);

    const orphanageList = await orphanageRep.find({
      relations: ['images']
    });

    return res.json({ok: true, data: OrphanageView.renderMany(orphanageList)});
  }

  async show(req: Request, res: Response){
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return res.status(400).json({ok: false, error: validationErrors.array()})
    }

    const {id}         = req.params;
    const orphanageRep = getRepository(Orphanage);

    const orphanage = await orphanageRep.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json({ok: true, data: OrphanageView.render(orphanage)});
  }

  async create(req: Request, res: Response) {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return res.status(400).json({ok: false, error: validationErrors.array({onlyFirstError: true})})
    }

    const {name, latitude, longitude, about,
      instructions, opening_hours, open_on_weekends} = req.body;

    const orphanageRep       = getRepository(Orphanage);
    const arrOrphanageImages = req.files as Express.Multer.File[];
    const orphanageImages    = arrOrphanageImages.map((img) => ({path: img.filename}))


    const newOrphanage = orphanageRep.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images: orphanageImages
    });

    const orphanageDb = await orphanageRep.save(newOrphanage);
    if(!orphanageDb){
      return res.status(400).json({ok: false, error:
          [{msg: 'Não foi possível criar cadastro. Por favor, tente novamente.'}]});
    }

    res.status(201).json({ok: true, data: orphanageDb});
  }

}

export default OrphanageController;