"use server";

import bcrypt from "bcryptjs";

import { getUserByEmail, getUserByTel } from "@/data/user";
import { NewUserSchema } from "@/schemas";

import * as z from "zod";
import { prisma } from "@/lib/db/prisma";
import { currentRole } from "@/lib/auth";
import { Role } from "@prisma/client";

export const newUser = async (values: z.infer<typeof NewUserSchema>) => {
    const userRole = await currentRole();

    if (userRole !== "ADMIN") {
        return { error: "Bu işlemi yapmak için yetkiniz yok." };
    }

    const validatedFields = NewUserSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const {
        firstName,
        lastName,
        email,
        tel,
        password,
        role,
        emailNoti,
        smsNoti,
        emailVerified,
    } = validatedFields.data;

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

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            tel,
            password: hashedPassword,
            role,
            emailNoti,
            smsNoti,
            emailVerified: emailVerified === true ? new Date() : null,
        },
    });

    if (role === Role.DEALER) {
        await prisma.dealer.create({
            data: {
                User: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
    }

    return {
        success: "Kullanıcı başarıyla oluşturuldu.",
    };
};
