"use server";

import { updateDiscount } from "@/app/(user)/sepetim/cart";
import { prisma } from "./prisma";

export async function removeItemFromCart(itemId: string) {
    await prisma.cartItem.delete({
        where: {
            id: itemId,
        },
    });

    await updateDiscount();
}
