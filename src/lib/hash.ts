import bcrypt from 'bcrypt';

class HashService {
    hashPasswordBcrypt = async (password: string) => {
        return await bcrypt.hash(password, 12);
    };

    comparePasswordBcrypt = async (password: string, hash: string) => {
        return await bcrypt.compare(password, hash);
    };
}

export const hashService = new HashService();
