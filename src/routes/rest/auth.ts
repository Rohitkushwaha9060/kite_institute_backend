import { authControllerRest } from '@/controllers/rest';
import { errorHandler } from '@/errors/rest';
import express from 'express';

const router = express.Router();

router.post('/signup', errorHandler(authControllerRest.signup));

export { router as authRouterRest };
