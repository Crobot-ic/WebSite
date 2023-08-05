import { RequestHandler, Request, Response, NextFunction } from 'express'

const Logs: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    next();
}

export default Logs;