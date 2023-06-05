import { RequestHandler, Request, Response, NextFunction } from 'express'

const CheckMailInformations: RequestHandler = (req: Request, res: Response, next: NextFunction) => {    
    next();
}

export default CheckMailInformations;