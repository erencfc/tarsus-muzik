"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email, {
        emailVerified: true,
        email: true,
    });

    if (!existingUser || !existingUser.email) {
        return { error: "Bu e-posta ile kayıtlı bir kullanıcı bulunamadı." };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );
        return { success: "Doğrulama maili gönderildi." };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });

        return { success: "Başarıyla giriş yapıldı." };
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type == "CredentialsSignin") {
                return { error: "Email veya şifre hatalı." };
            } else {
                return { error: "Bir hata oluştu." };
            }
        }

        throw error;
    }
};
