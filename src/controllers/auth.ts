import { HttpError } from '@/errors';
import { authService, emailService } from '@/services';
import { signUpSchema } from '@/schema';
import { Request, Response, NextFunction } from 'express';

class AuthController {
    // sign up
    async signup(req: Request, res: Response, next: NextFunction) {
        // data validation
        const data = await signUpSchema.parse(req.body);
        if (!data) {
            //@ts-ignore
            return next(new HttpError(data, 400));
        }

        const response = await authService.signUp(
            data.name,
            data.email,
            data.phone,
            data.password
        );

        if (response.statusCode === 201) {
            res.cookie('verify-email', response?.data?.token, {
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
            res.cookie('verify-email', response?.data?.token, {
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

        //@ts-ignore
        const token = req.token!;
        if (!token) {
            return next(new HttpError('Token is required', 400));
        }

        const response = await authService.verifyEmail(token, otp);

        if (response.statusCode === 200) {
            res.cookie('verify-email', null, {
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
}
export const authControllerRest = new AuthController();
