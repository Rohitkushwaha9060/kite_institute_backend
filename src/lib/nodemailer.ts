import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { logger } from '@/core';
config();

const transporter = nodemailer.createTransport({
    //@ts-ignore
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = async ({
    to,
    from,
    subject,
    mailBody,
}: {
    to?: string;
    from?: string;
    subject: string;
    mailBody: any;
}) => {
    const mailOptions = {
        from: from || process.env.EMAIL_FORM,
        to: to || process.env.EMAIL_TO,
        subject,
        html: mailBody,
    };
    try {
        await transporter.sendMail(mailOptions);
        logger.info('Mail sent successfully');
    } catch (error) {
        console.log(error);
        logger.error('Error sending mail');
    }
};
