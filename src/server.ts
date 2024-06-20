import http from 'http';
import * as socketIO from 'socket.io';

// file imports
import app from '@/app';
import { logger, secrets } from '@/core';
import { errorHandler } from './middleware/rest';

// server initialization
const server = http.createServer(app);

// socket.io initialization
const io = new socketIO.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        optionsSuccessStatus: 204,
        preflightContinue: true,
    },
});

// set up socket.io
io.on('connection', (socket) => {
    logger.info('A user connected ' + socket.id);

    socket.on('disconnect', () => {
        logger.info('A user disconnected ' + socket.id);
    });
});

// set io in app
app.set('socket', io);

// global error handler
app.use(errorHandler);

// server start
server.listen(secrets.PORT, () => {
    logger.info(`Server is running on port ${secrets.PORT}`);
});
