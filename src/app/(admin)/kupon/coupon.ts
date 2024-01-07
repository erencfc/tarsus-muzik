"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCoupon(couponId: string) {
    await prisma.coupon.delete({
        where: {
            id: couponId,
        },
    });

    revalidatePath("/kupon");
}
