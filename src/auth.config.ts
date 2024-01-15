import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { prisma } from "./lib/db/prisma";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { getUserById } from "./data/user";

export default {
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

                        console.log(user);
                        return user;
                    }
                } catch (error) {
                    console.log("error.......", error);
                }
            },
        }),
    ],
} satisfies NextAuthConfig;
