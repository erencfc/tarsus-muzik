import { prisma } from "@/lib/db/prisma";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},

            async authorize(credentials: any): Promise<any | null> {
                const { emailOrTel, password } = credentials;

                try {
                    let user;

                    if (emailOrTel.includes("@"))
                        user = await prisma.user.findUnique({
                            where: { email: emailOrTel },
                        });
                    else
                        user = await prisma.user.findUnique({
                            where: { tel: emailOrTel },
                        });

                    if (!user) return null;

                    const isPasswordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isPasswordsMatch) return null;

                    delete (user as { password?: string }).password;
                    return {
                        id: user.id,
                    };
                } catch (error) {}
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({ token, account, user }) {
            if (account) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;

            return session;
        },
    },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
