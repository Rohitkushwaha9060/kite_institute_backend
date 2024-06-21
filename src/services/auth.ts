import { prisma, tokenService, hashService, generateOTP } from '@/lib';
import { ServiceResponse } from '@/interfaces';
import { emailService } from './email';

class AuthService {
    // sign up
    async signUp(
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<ServiceResponse> {
        // check if email is already in use
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // check if email is already in use
        if (user) {
            return {
                statusCode: 400,
                message: 'Email already in use',
                data: {
                    user,
                },
            };
        }

        // hash password
        const hashedPassword = await hashService.hashPasswordBcrypt(password);

        // otp verification
        const otp = String(await generateOTP());

        // create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                otp,
            },
        });

        // generate token
        const token = await tokenService.createTokenJwt(
            {
                name,
                email,
            },
            email,
            '1d'
        );

        // update user
        await prisma.user.update({
            where: {
                id: newUser.id,
            },
            data: {
                token,
            },
        });

        // send verification email
        await emailService.sendVerificationEmail(newUser.email, otp);

        // return response
        return {
            statusCode: 201,
            message: 'success',
            data: {
                user: newUser,
                token,
            },
        };
    }

    // verification mail
    async sendVerificationMail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
            };
        }

        // otp verification
        const otp = String(await generateOTP());

        // generate token
        const token = await tokenService.createTokenJwt(
            {
                email: user.email,
            },
            user.email,
            '1d'
        );

        // update user
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                otp,
                token,
            },
        });

        // send verification email
        await emailService.sendVerificationEmail(user.email, otp);

        // return response
        return {
            statusCode: 200,
            message: 'success',
            data: {
                token,
            },
        };
    }

    // verify email
    async verifyEmail(email: string, token: string) {
        return null;
    }

    // sign in
    async signIn(email: string, password: string) {
        return null;
    }

    // sign out
    async signOut(email: string) {
        return null;
    }
}

export const authService = new AuthService();
