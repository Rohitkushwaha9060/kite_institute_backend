import * as z from 'zod';

export const signUpSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .min(3, { message: 'Name must be at least 3 characters long' }),
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email' }),
    phone: z
        .string({ required_error: 'Phone is required' })
        .min(10, { message: 'Phone must be at least 10 characters long' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' }),
});
