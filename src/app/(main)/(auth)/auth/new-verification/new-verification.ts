"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/db/prisma";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Doğrulama kodu bulunamadı." };
    }

    const hasExpired = existingToken.expiresAt < new Date();

    if (hasExpired) {
        return { error: "Doğrulama kodunun süresi dolmuş." };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Kullanıcı bulunamadı." };
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: { emailVerified: new Date(), email: existingToken.email },
    });

    await prisma.verificationToken.delete({
        where: { id: existingToken.id },
    });

    return { success: "E-posta adresiniz doğrulandı." };
};
