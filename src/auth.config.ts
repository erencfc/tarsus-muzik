import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { prisma } from "./lib/db/prisma";
import bcrypt from "bcryptjs";
import { Role, User } from "@prisma/client";
import { getUserById } from "./data/user";

export default {
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as Role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById({ id: token.sub });

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const validatedFields = LoginSchema.safeParse(credentials);

                    if (validatedFields.success) {
                        const { email, password } = validatedFields.data;

                        let user: User | null = null;
                        if (email.includes("@"))
                            user = await prisma.user.findUnique({
                                where: { email: email },
                            });
                        else
                            user = await prisma.user.findUnique({
                                where: { tel: email },
                            });

                        if (!user) return null;

                        const isPasswordsMatch = await bcrypt.compare(
                            password,
                            user.password
                        );
                        if (!isPasswordsMatch) return null;

                        delete user.password;

                        return user;
                    }
                } catch (error) {
                    console.log("error.......", error);
                }
            },
        }),
    ],
} satisfies NextAuthConfig;
