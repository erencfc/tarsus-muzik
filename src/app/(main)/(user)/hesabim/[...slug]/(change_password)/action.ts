"use server";

import { prisma } from "@/lib/db/prisma";
import { getErrorMessage } from "@/lib/utils";
import { UserPayload } from "@/types/UserPayload";
import bcrypt from "bcryptjs";

export async function changeUserPassword({
    formData,
    user,
}: {
    formData: FormData;
    user: UserPayload | null;
}) {
    const currentPassword = formData.get("currentPassword")?.toString();
    const newPassword = formData.get("newPassword")?.toString();
    const newPasswordConfirm = formData.get("newPasswordConfirm")?.toString();

    if (!currentPassword || !newPassword || !newPasswordConfirm) {
        return {
            success: false,
            error: "Lütfen boş alan bırakmayınız.",
        };
    }

    if (currentPassword === newPassword) {
        return {
            success: false,
            error: "Yeni şifreniz mevcut şifreniz ile aynı olamaz.",
        };
    }

    if (newPassword !== newPasswordConfirm) {
        return {
            success: false,
            error: "Şifreler eşleşmiyor.",
        };
    }

    if (user === null) {
        return {
            success: false,
            error: "Kullanıcı bulunamadı.",
        };
    }

    const oldUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!oldUser) {
        return {
            success: false,
            error: "Kullanıcı bulunamadı.",
        };
    }

    const isPasswordsMatch = await bcrypt.compare(
        currentPassword,
        oldUser.password
    );

    if (!isPasswordsMatch) {
        return {
            success: false,
            error: "Mevcut şifreniz yanlış.",
        };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 16);

    if (!hashedPassword) {
        return {
            success: false,
            error: "Bir hata oluştu, lütfen tekrar deneyin.",
        };
    }

    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });

        return {
            success: true,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}
