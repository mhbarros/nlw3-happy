import {body, param} from "express-validator";

const CreateOrphanateValidator = [
  body('name')
    .isString().withMessage('Campo obrigatório')
    .notEmpty({ignore_whitespace: true}).withMessage('Campo obrigatório')
    .isLength({max: 100, min: 3}).withMessage('Mínimo 3 e máximo 100 caracteres'),
  body('latitude', 'Valor inválido').isNumeric().notEmpty(),
  body('longitude', 'Valor inválido').isNumeric().notEmpty(),
  body('about', 'Campo obrigatório').isString().notEmpty(),
  body('instructions', 'Campo obrigatório').isString().notEmpty(),
  body('open_on_weekends', 'Campo obrigatório').isBoolean().notEmpty(),
  body('opening_hours', 'Campo obrigatório').isString().isLength({max: 100}),
]

const ShowOrphanateValidator = [
  param('id').notEmpty().isNumeric()
]

export {
  CreateOrphanateValidator,
  ShowOrphanateValidator
}