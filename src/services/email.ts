import { sendMail } from '@/lib';
import Mailgen from 'mailgen';

class EmailService {
    async emailReady(mailgenContent: any) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Kite Institute - Email',
                link: '#',
            },
        });

        return mailGenerator.generate(mailgenContent);
    }

    async sendVerificationEmail(email: string, otp: string) {
        const mailgenContent = {
            body: {
                intro: 'Hi there, welcome to Kite Institute!',
                dictionary: {
                    OTP: otp,
                },
                outro: 'Please verify your email . ',
            },
        };

        await sendMail({
            to: email,
            subject: 'Verify your email',
            mailBody: await this.emailReady(mailgenContent)!,
        });
    }
}

export const emailService = new EmailService();
