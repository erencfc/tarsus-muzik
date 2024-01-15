"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { prisma } from "@/lib/db/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const { firstName, lastName, email, tel, password } = validatedFields.data;

    try {
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { tel }],
            },
        });

        if (userExists) {
            return {
                error: "Bu e-posta veya telefon numarası ile zaten kayıt olunmuş.",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 16);

        if (!hashedPassword) {
            return {
                error: "Bir hata oluştu, lütfen tekrar deneyin.",
            };
        }

        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                tel,
            },
        });

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return {
            success: "Doğrulama maili gönderildi.",
        };
    } catch (error) {
        throw error;
    }
};
