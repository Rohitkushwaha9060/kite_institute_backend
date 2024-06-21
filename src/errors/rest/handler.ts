import { Request, Response, NextFunction } from 'express';
import { HttpError } from './http';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const errorHandler = (func: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (error: any) {
            let err;
            if (error instanceof HttpError) {
                err = error;
            } else if (error instanceof ZodError) {
                err = new HttpError(
                    error.issues[0].message || 'Unprocessable Entity',
                    400,
                    error
                );
            } else if (error instanceof TokenExpiredError) {
                err = new HttpError('Token expired', 401, error);
            } else if (error instanceof JsonWebTokenError) {
                err = new HttpError('Token Invalid', 401, error);
            } else {
                err = new HttpError(
                    error.message || 'Something went wrong',
                    500,
                    error
                );
            }
        }
    };
};
