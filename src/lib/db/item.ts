"use server";

import { updateDiscount } from "@/app/(main)/(user)/sepetim/cart";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function removeItemFromCart(itemId: string) {
    await prisma.cartItem.delete({
        where: {
            id: itemId,
        },
    });

    await updateDiscount();

    revalidatePath("/sepetim");
}
