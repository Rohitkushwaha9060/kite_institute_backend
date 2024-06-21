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

    async sendVerificationEmail(email: string, token: string) {
        const mailgenContent = {
            body: {
                intro: "Welcome to our app! We're very excited to have you on board.",
                dictionary: {
                    OTP: token,
                },
                outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
            },
        };

        await sendMail(
            email,
            'info@kite.com',
            'Verify your email',
            await this.emailReady(mailgenContent)
        );
    }
}

export const emailService = new EmailService();
