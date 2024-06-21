class HttpError extends Error {
    public statusCode: number;
    public error: any;
    public status: string;

    constructor(message: string, statusCode: number, error?: any) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.status = statusCode < 500 ? 'fail' : 'error';
    }
}

const NotFoundError = (message: string) => new HttpError(message, 400);
const UnauthorizedError = (message: string) => new HttpError(message, 401);
const ForbiddenError = (message: string) => new HttpError(message, 403);
const BadRequestError = (message: string) => new HttpError(message, 404);
const InternalServerError = (message: string) => new HttpError(message, 500);

export {
    HttpError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError,
    InternalServerError,
};
