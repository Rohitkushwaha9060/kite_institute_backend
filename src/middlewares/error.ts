import { HttpError } from '@/errors';
import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
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

export { globalErrorHandler };
