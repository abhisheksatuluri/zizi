import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Guest Checkout",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "guest@example.com" },
            },
            async authorize(credentials) {
                // This is a mock guest login for demo/dev purposes
                // In production, this would verify against a database
                if (credentials?.email) {
                    return {
                        id: "guest_" + Date.now(),
                        name: "Guest User",
                        email: credentials.email,
                    };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                // @ts-ignore
                session.user.id = token.sub;
            }
            return session;
        },
    },
});
