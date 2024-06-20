import { Request, Response, NextFunction } from 'express';
import { HttpError } from './http';
import { ZodError } from 'zod';

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
