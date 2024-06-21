import { authControllerRest } from '@/controllers';
import { errorHandler } from '@/errors';
import { tokenMiddlewareRest } from '@/middleware';
import express from 'express';

const router = express.Router();

// sign up
router.post('/signup', errorHandler(authControllerRest.signup));

// send verification mail
router.post(
    '/send-verification-mail',
    errorHandler(authControllerRest.sendVerificationMail)
);

// verify email
router.post(
    '/verify-email',
    errorHandler(tokenMiddlewareRest),
    errorHandler(authControllerRest.verifyEmail)
);

export { router as authRouterRest };
