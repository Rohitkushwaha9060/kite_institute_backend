import { HttpError } from '@/errors';
import { Request, Response, NextFunction } from 'express';

export const tokenMiddlewareRest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token =
        req.cookies['token'] ||
        req.headers.authorization?.split(' ')[1] ||
        null;
    if (!token) {
        return next(new HttpError('No token provided', 401));
    }

    req.token = token;
    return next();
};
