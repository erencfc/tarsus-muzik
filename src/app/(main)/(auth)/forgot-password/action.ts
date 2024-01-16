"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Mail adresi geçerli değil." };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Bu mail adresi ile kayıtlı kullanıcı bulunamadı." };
    }

    const passwordResetToken = await generatePasswordResetToken(
        existingUser.email
    );
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return {
        success: "Şifre sıfırlama maili gönderildi.",
    };
};
