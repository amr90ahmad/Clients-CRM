import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const result =
                    await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
                const user = result.rows[0];

                if (!user) {
                    return null;
                }

                const correctPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!credentials.password) {
                    return null;
                }

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
