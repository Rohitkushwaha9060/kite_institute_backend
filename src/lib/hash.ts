import bcrypt from 'bcrypt';

export const hashPasswordBcrypt = async (password: string) => {
    return await bcrypt.hash(password, 12);
};

export const comparePasswordBcrypt = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};
