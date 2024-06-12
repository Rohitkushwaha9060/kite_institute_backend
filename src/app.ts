import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// file imports
import { logger, secrets } from '@/core';

// express app initialization
const app = express();

// express app configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
app.use(logger.httpExpress);

// express app middlewares
app.use(
    cors({
        origin: secrets.ALLOW_ORIGIN_ONE,
        credentials: true,
        optionsSuccessStatus: 204,
        preflightContinue: true,
    })
);
app.use(helmet());
app.use(cookieParser());

// express app routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

// export express app
export default app;
