"use server";

import { updateDiscount } from "@/app/(user)/sepetim/cart";
import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(
    productId: string,
    quantity = 1
) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(
        (item) => item.productId === productId
    );

    if (articleInCart) {
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: quantity } },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                CartId: cart.id,
                productId,
                quantity,
            },
        });
    }

    await updateDiscount();

    revalidatePath("/urun/[slug]", "page");
}

export async function getComments(productId: string) {
    const comments = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        select: {
            Comment: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    rating: true,
                    User: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                    createdAt: true,
                },
            },
        },
    });

    return comments?.Comment ?? [];
}
