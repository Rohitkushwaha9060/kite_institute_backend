import { Request, Response, NextFunction } from 'express';

export const tokenMiddlewareRest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies['verify-email'] || req.headers['token'];
    if (!token) {
        return next(new Error('No token found'));
    }
    // @ts-ignore
    req.token = token;
    return next();
};
