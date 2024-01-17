"use server";

import bcrypt from "bcryptjs";

import { getUserByEmail, getUserByTel } from "@/data/user";
import { NewUserSchema } from "@/schemas";

import * as z from "zod";
import { prisma } from "@/lib/db/prisma";

export const newUser = async (values: z.infer<typeof NewUserSchema>) => {
    const validatedFields = NewUserSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const { firstName, lastName, email, tel, password, role } =
        validatedFields.data;

    const existingUserEmail = await getUserByEmail(email);

    if (existingUserEmail) {
        return { error: "Bu mail adresi ile kayıtlı kullanıcı bulunmaktadır." };
    }

    const existingUserTel = await getUserByTel(tel);

    if (existingUserTel) {
        return {
            error: "Bu telefon numarası ile kayıtlı kullanıcı bulunmaktadır.",
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
            tel,
            password: hashedPassword,
            role,
        },
    });

    return {
        success: "Kullanıcı başarıyla oluşturuldu.",
    };
};
