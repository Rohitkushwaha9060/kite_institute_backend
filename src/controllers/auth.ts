import { HttpError } from '@/errors';
import { signUpSchema } from '@/core';
import { authService } from '@/services';
import { Request, Response, NextFunction } from 'express';

class AuthController {
    // sign up
    async signUp(req: Request, res: Response, next: NextFunction) {
        // data validation
        const { data, error } = signUpSchema.safeParse(req.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400, error));
        }

        const response = await authService.signUp(
            data.name,
            data.email,
            data.phone,
            data.password
        );

        if (response.statusCode === 201) {
            res.cookie('token', response?.data?.token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1,
                sameSite: 'none',
                secure: true,
            });
            return res.status(201).json({
                statusCode: response.statusCode,
                message: response.message,
                data: response.data,
            });
        } else {
            return next(new HttpError(response.message, response.statusCode));
        }
    }

    // send verification mail
    async sendVerificationMail(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { email } = req.body;

        if (!email) {
            return next(new HttpError('Email is required', 400));
        }

        const response = await authService.sendVerificationMail(email);

        if (response.statusCode === 200) {
            res.cookie('token', response?.data?.token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1,
                sameSite: 'none',
                secure: true,
            });

            return res.status(200).json({
                statusCode: response.statusCode,
                message: response.message,
                data: response.data,
            });
        } else {
            return next(new HttpError(response.message, response.statusCode));
        }
    }

    // verify email
    async verifyEmail(req: Request, res: Response, next: NextFunction) {
        const { otp } = req.body;

        if (!otp) {
            return next(new HttpError('OTP is required', 400));
        }

        const token = req.token!;
        if (!token) {
            return next(new HttpError('Token is required', 400));
        }

        const response = await authService.verifyEmail(token, otp);

        if (response.statusCode === 200) {
            res.cookie('token', null, {
                httpOnly: true,
                maxAge: 60,
                sameSite: 'none',
                secure: true,
            });
            return res.status(200).json({
                statusCode: response.statusCode,
                message: response.message,
                data: response.data,
            });
        } else {
            return next(new HttpError(response.message, response.statusCode));
        }
    }

    // sign in
    async signin(req: Request, res: Response, next: NextFunction) {}
}
export const authController = new AuthController();
