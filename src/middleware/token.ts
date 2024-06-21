import { HttpError } from '@/errors';
import { Request, Response, NextFunction } from 'express';

export const tokenMiddlewareRest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies['verify-email'] || req.headers['token'];
    if (!token) {
        return next(new HttpError('No token provided', 401));
    }
    // @ts-ignore
    req.token = token;
    return next();
};
