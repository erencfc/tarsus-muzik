"use server";

import { prisma } from "@/lib/db/prisma";
import { getErrorMessage } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function register(formData: FormData) {
    const [firstName, lastName, email, tel, password, passwordConfirm] = [
        formData.get("firstName")?.toString(),
        formData.get("lastName")?.toString(),
        formData.get("email")?.toString(),
        formData.get("tel")?.toString(),
        formData.get("password")?.toString(),
        formData.get("passwordConfirm")?.toString(),
    ];

    if (
        !firstName ||
        !lastName ||
        !email ||
        !tel ||
        !password ||
        !passwordConfirm
    ) {
        return {
            success: false,
            error: "Lütfen tüm alanları doldurun.",
        };
    }

    if (password !== passwordConfirm) {
        return {
            success: false,
            error: "Şifreler eşleşmiyor.",
        };
    }

    const emailExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (emailExists) {
        return {
            success: false,
            error: "Bu e-posta ile zaten kayıt olunmuş.",
        };
    }

    const telExists = await prisma.user.findUnique({
        where: {
            tel,
        },
    });

    if (telExists) {
        return {
            success: false,
            error: "Bu telefon numarası ile zaten kayıt olunmuş.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    if (!hashedPassword) {
        return {
            success: false,
            error: "Bir hata oluştu, lütfen tekrar deneyin.",
        };
    }

    try {
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                tel,
            },
        });
    } catch (error: unknown) {
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }

    return {
        success: true,
        error: null,
    };
}
