"use server";
import { currentRole } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { AddProductToDealerSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

import * as z from "zod";
export const addProductToDealer = async (
    values: z.infer<typeof AddProductToDealerSchema>
) => {
    const userRole = await currentRole();

    if (userRole !== "ADMIN") {
        return { error: "Bu işlemi yapmak için yetkiniz yok." };
    }

    const validatedFields = AddProductToDealerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Lütfen gerekli alanları doldurunuz." };
    }

    const { dealerId, price, productId } = validatedFields.data;

    try {
        const existingProduct = await prisma.dealerPrice.findFirst({
            where: {
                productId,
                dealerId,
            },
        });

        if (existingProduct) {
            return { error: "Bu ürün zaten bu bayide var." };
        }

        await prisma.dealerPrice.create({
            data: {
                price: Number(price),
                dealerId,
                productId,
            },
        });

        revalidatePath("/admin/dashboard/dealers/[id]", "page");

        return { success: "Ürün başarıyla eklendi." };
    } catch (error) {
        console.log(error);
        return { error: "Bir hata oluştu." };
    }
};
