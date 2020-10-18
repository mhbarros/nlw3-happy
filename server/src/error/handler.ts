import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';


const errorCheck: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return res.status(500).json({ok: false, msg: 'Internal Server Error'});
}

export default errorCheck