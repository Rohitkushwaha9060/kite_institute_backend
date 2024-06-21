import jwt from 'jsonwebtoken';

export const createToken = (payload: {}, secret: string, expiresIn: string) => {
    return jwt.sign(payload, secret, {
        expiresIn,
    });
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
};
