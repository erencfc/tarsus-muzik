"use server";

import { currentRole } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { Role } from "@prisma/client";
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";

export const deleteProduct = async (id: string) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return { error: "Bu işlemi yapmaya yetkiniz yok." };
    }

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
        return { error: "Ürün bulunamadı." };
    }

    try {
        await prisma.product.delete({ where: { id } });

        for (const image of product.images as string[]) {
            await unlink(join(process.cwd(), "public", image));
        }

        revalidatePath("/admin/dashboard/products");
        return { success: "Ürün başarıyla silindi." };
    } catch (error) {
        console.log(error);
        return { error: "Ürün silinirken bir hata oluştu." };
    }
};
