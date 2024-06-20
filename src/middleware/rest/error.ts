import { HttpError } from '@/errors/rest';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const status = err.status;
    const message = err.message || 'Internal Server Error';
    const error = err.error || null;
    res.status(statusCode).json({ message, status, error });
};

export { errorHandler };
