import { authControllerRest } from '@/controllers/rest';
import { errorHandler } from '@/errors/rest';
import express from 'express';

const router = express.Router();

// sign up
router.post('/signup', errorHandler(authControllerRest.signup));

// send verification mail
router.post(
    '/send-verification-mail',
    errorHandler(authControllerRest.sendVerificationMail)
);

export { router as authRouterRest };
