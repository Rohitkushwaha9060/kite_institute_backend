import admin from 'firebase-admin';
import { secrets } from '@/core';

export const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
        // @ts-ignore
        type: secrets.FIREBASE_TYPE,
        project_id: secrets.FIREBASE_PROJECT_ID,
        private_key_id: secrets.FIREBASE_PROJECT_KEY_ID,
        private_key: secrets.FIREBASE_PRIVATE_KEY,
        client_email: secrets.FIREBASE_CLIENT_EMAIL,
        client_id: secrets.FIREBASE_CLIENT_ID,
        auth_uri: secrets.FIREBASE_AUTH_URI,
        token_uri: secrets.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url:
            secrets.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: secrets.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: secrets.FIREBASE_UNIVERSE_DOMAIN,
    }),
});
