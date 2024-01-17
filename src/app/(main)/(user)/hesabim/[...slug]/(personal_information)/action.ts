"use server";

import { prisma } from "@/lib/db/prisma";
import { PersonalInformationSchema } from "@/schemas";
import { UserPayload } from "@/types/UserPayload";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updatePersonalInformation = async (
    values: z.infer<typeof PersonalInformationSchema>,
    oldUser: UserPayload
) => {
    const validatedFields = PersonalInformationSchema.safeParse(values);

    if (!validatedFields.success) {
        const issue = (validatedFields as any).error.issues[0];
        if (issue.code === "custom") {
            return { error: issue.message };
        }
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const { firstName, lastName, email, tel, emailNoti, smsNoti } =
        validatedFields.data;

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                id: oldUser.id,
            },
        });

        if (!userExists) {
            return {
                error: "Kullanıcı bulunamadı.",
            };
        }

        if (
            userExists.firstName === firstName &&
            userExists.lastName === lastName &&
            userExists.email === email &&
            userExists.tel === tel &&
            userExists.emailNoti === emailNoti &&
            userExists.smsNoti === smsNoti
        ) {
            return {
                error: "Değişiklik yapmadınız.",
            };
        }

        if (userExists.email !== email) {
            const emailExists = await prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if (emailExists) {
                return {
                    error: "Bu e-posta adresi ile zaten bir hesap var.",
                };
            }
        }

        if (userExists.tel !== tel) {
            const telExists = await prisma.user.findFirst({
                where: {
                    tel,
                },
            });

            if (telExists) {
                return {
                    error: "Bu telefon numarası ile zaten bir hesap var.",
                };
            }
        }

        await prisma.user.update({
            where: {
                id: oldUser.id,
            },
            data: {
                firstName,
                lastName,
                email,
                tel,
                emailNoti,
                smsNoti,
            },
        });

        revalidatePath("/hesabim/kisisel-bilgilerim");

        return {
            success: "Kişisel bilgileriniz güncellendi.",
        };
    } catch (error) {
        throw error;
    }
};
