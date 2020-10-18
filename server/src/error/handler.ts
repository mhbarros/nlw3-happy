import {Request, Response, ErrorRequestHandler} from 'express';


const errorCheck: ErrorRequestHandler = (error: Error, req: Request, res: Response) => {
  console.error(error);
  return res.status(500).json({ok: false, msg: 'Internal Server Error'});
}

export default errorCheck