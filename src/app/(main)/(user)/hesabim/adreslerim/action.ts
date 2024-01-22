"use server";

import * as z from "zod";

import { prisma } from "@/lib/db/prisma";
import { AddressSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";

export const createAddress = async (
    values: z.infer<typeof AddressSchema>
): Promise<{ success?: string; error?: string }> => {
    const validatedFields = AddressSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const {
        alias,
        billingType,
        city,
        details,
        district,
        firstName,
        lastName,
        tel,
        town,
        zipCode,
        corporateName,
        nationalId,
        taxNumber,
        taxOffice,
    } = validatedFields.data;

    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Bir hata oluştu. (Kullanıcı bulunamadı)" };
        }

        let data: Prisma.AddressCreateInput = {
            alias,
            firstName,
            lastName,
            tel,
            city,
            district,
            town,
            details,
            zipCode,
            billingType,
            nationalId: nationalId ? nationalId : undefined,
            taxNumber: taxNumber ? taxNumber : undefined,
            taxOffice: taxOffice ? taxOffice : undefined,
            corporateName: corporateName ? corporateName : undefined,
            active: true,
            User: { connect: { id: user.id } },
        };

        await prisma.address.create({ data });

        revalidatePath("/hesabim/adreslerim");
        return { success: "Adres başarıyla oluşturuldu." };
    } catch (error: any) {
        if (error.message?.includes("Unique")) {
            return { error: "Bu isimde bir adres zaten var." };
        }
        console.log(error);
        return { error: "Bir hata oluştu." };
    }
};

export const updateAddress = async (
    values: z.infer<typeof AddressSchema>,
    addressId: string
): Promise<{ success?: string; error?: string }> => {
    const validatedFields = AddressSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const {
        alias,
        billingType,
        city,
        details,
        district,
        firstName,
        lastName,
        tel,
        town,
        zipCode,
        corporateName,
        nationalId,
        taxNumber,
        taxOffice,
    } = validatedFields.data;

    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Bir hata oluştu. (Kullanıcı bulunamadı)" };
        }

        let data: Prisma.AddressCreateInput = {
            alias,
            firstName,
            lastName,
            tel,
            city,
            district,
            town,
            details,
            zipCode,
            billingType,
            active: true,
            User: { connect: { id: user.id } },
        };

        if (billingType === "INDIVIDUAL") {
            data = {
                ...data,
                nationalId,
                corporateName: null,
                taxNumber: null,
                taxOffice: null,
            };
        } else {
            data = {
                ...data,
                corporateName,
                taxNumber,
                taxOffice,
                nationalId: null,
            };
        }

        await prisma.address.update({ where: { id: addressId }, data });

        revalidatePath("/hesabim/adreslerim");
        return { success: "Adres başarıyla güncellendi." };
    } catch (error: any) {
        if (error.message?.includes("Unique")) {
            return { error: "Bu isimde bir adres zaten var." };
        }
        console.log(error);
        return { error: "Bir hata oluştu." };
    }
};
