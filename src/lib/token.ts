import jwt from 'jsonwebtoken';

class TokenService {
    verifyTokenJwt = (token: string, secret: string) => {
        return jwt.verify(token, secret);
    };

    createTokenJwt = (payload: {}, secret: string, expiresIn: string) => {
        return jwt.sign(payload, secret, {
            expiresIn,
        });
    };
}

export const tokenService = new TokenService();
