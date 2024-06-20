import { Request, Response, NextFunction } from 'express';

class AuthController {
    async signup(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Hello World!' });
    }
}

export const authControllerRest = new AuthController();
