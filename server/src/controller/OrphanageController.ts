import {Request, Response} from "express";
import {validationResult} from 'express-validator';
import {getRepository} from "typeorm";
import Orphanage from "../model/Orphanage";
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

    const {id} = req.params;
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

    const orphanageImages = req.files as Express.Multer.File[];
    const images = orphanageImages.map((img) => ({path: img.filename}))


    const orphanageRep = getRepository(Orphanage);
    const newOrphanage = orphanageRep.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    const t = await orphanageRep.save(newOrphanage);
    res.status(201).json({ok: true, data: t});


  }

}

export default OrphanageController;