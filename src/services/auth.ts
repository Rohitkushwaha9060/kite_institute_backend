class AuthService {
    // sign up
    async signUp(name: string, email: string, phone: string, password: string) {
        return null;
    }

    // verification mail
    async sendVerificationMail(email: string) {
        return null;
    }

    // verify email
    async verifyEmail(email: string, token: string) {
        return null;
    }

    // sign in
    async signIn(email: string, password: string) {
        return null;
    }

    // sign out
    async signOut(email: string) {
        return null;
    }
}

export const authService = new AuthService();
