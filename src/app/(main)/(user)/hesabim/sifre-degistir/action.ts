"use server";

import * as z from "zod";
import { UpdatePasswordSchema } from "@/schemas";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export const updatePassword = async (
    values: z.infer<typeof UpdatePasswordSchema>,
    userId: string
) => {
    const validatedFields = UpdatePasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const { currentPassword, newPassword } = validatedFields.data;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return { error: "Kullanıcı bulunamadı." };
        }

        const isPasswordsMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordsMatch) {
            return {
                error: "Mevcut şifreniz yanlış.",
            };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 16);

        if (!hashedPassword) {
            return {
                error: "Bir hata oluştu, lütfen tekrar deneyin.",
            };
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
            },
        });

        return { success: "Şifreniz başarıyla değiştirildi." };
    } catch (error) {
        console.log(error);
        return { error: "Bir hata oluştu. Lütfen tekrar deneyiniz." };
    }
};
