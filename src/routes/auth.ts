import { Router } from 'express';
import { authController } from '@/controllers';
import { errorHandler } from '@/errors';
import { tokenMiddlewareRest } from '@/middlewares';

const router = Router();

// sign up
router.post('/signup', errorHandler(authController.signUp));
// send verification mail
router.post(
    '/send-verification-mail',
    errorHandler(authController.sendVerificationMail)
);

// verify email
router.post(
    '/verify-email',
    errorHandler(tokenMiddlewareRest),
    errorHandler(authController.verifyEmail)
);

export { router as authRoutes };
