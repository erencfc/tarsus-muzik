"use server";

import { currentRole } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return { error: "Bu işlemi yapmaya yetkiniz yok." };
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
        return { error: "Kullanıcı bulunamadı." };
    }

    try {
        await prisma.user.delete({ where: { id } });
        revalidatePath("/admin/dashboard/users");
        return { success: "Kullanıcı başarıyla silindi." };
    } catch (error) {
        console.log(error);
        return { error: "Kullanıcı silinirken bir hata oluştu." };
    }
};
