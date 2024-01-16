"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: "Token bulunamadı." };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Geçersiz alanlar." };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Geçersiz token." };
    }

    const hasExpired = existingToken.expiresAt < new Date();

    if (hasExpired) {
        return { error: "Sıfırlama bağlantısının süresi dolmuş." };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "E-posta adresi bulunamadı." };
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    if (!hashedPassword) {
        return { error: "Bir hata oluştu, lütfen tekrar deneyin." };
    }

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    await prisma.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        success: "Şifreniz başarıyla değiştirildi.",
    };
};
