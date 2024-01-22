"use server";

import { prisma } from "@/lib/db/prisma";
import { Address } from "@prisma/client";
import { revalidatePath } from "next/cache";
import randombytes from "randombytes";

export const getAddressesByUserId = async ({ userId }: { userId: string }) => {
    const addresses = await prisma.address.findMany({
        where: { userId },
        select: {
            id: true,
            active: true,
            alias: true,
            firstName: true,
            lastName: true,
            tel: true,
            details: true,
            city: true,
            district: true,
            town: true,
            zipCode: true,
            billingType: true,
            nationalId: true,
            corporateName: true,
            taxNumber: true,
            taxOffice: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return addresses.filter((address) => address.active);
};

export const deleteAddressById = async ({
    addressId,
}: {
    addressId: string;
}): Promise<{
    error?: string;
    success?: string;
    address?: Address;
}> => {
    try {
        const oldAddressAlias = (
            await prisma.address.findUnique({
                where: { id: addressId },
                select: { alias: true },
            })
        ).alias;

        const address = await prisma.address.update({
            where: { id: addressId },
            data: {
                active: false,
                alias: `${oldAddressAlias}_${randombytes(20).toString("hex")}`,
            },
        });

        revalidatePath("/hesabim/adreslerim");
        return {
            success: "Adres başarıyla silindi.",
            address: { ...address, alias: oldAddressAlias },
        };
    } catch (error) {
        return { error: "Adres silinirken bir hata oluştu." };
    }
};

export const undoDeleteAddress = async ({
    address,
}: {
    address: Address;
}): Promise<{
    error?: string;
    success?: string;
}> => {
    try {
        await prisma.address.update({
            where: { id: address.id },
            data: { active: true, alias: address.alias },
        });

        revalidatePath("/hesabim/adreslerim");
        return { success: "Adres başarıyla tekrardan eklendi." };
    } catch (error) {
        return { error: "Adres tekrardan eklenirken bir hata oluştu." };
    }
};
