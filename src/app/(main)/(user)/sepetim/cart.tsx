"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(
        (item) => item.productId === productId
    );

    if (quantity === 0) {
        if (articleInCart) {
            await prisma.cartItem.delete({
                where: { id: articleInCart.id },
            });
        }
    } else {
        if (articleInCart) {
            await prisma.cartItem.update({
                where: { id: articleInCart.id },
                data: { quantity },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    quantity,
                    Product: { connect: { id: productId } },
                    Cart: { connect: { id: cart.id } },
                },
            });
        }
    }

    await updateDiscount();

    revalidatePath("/sepetim");
}

export async function removeCoupon() {
    const cart = (await getCart()) ?? (await createCart());

    if (!cart.Coupon) {
        return revalidatePath("/sepetim");
    }

    await prisma.cart.update({
        where: { id: cart.id },
        data: {
            Coupon: { disconnect: true },
            discount: 0,
        },
    });

    revalidatePath("/sepetim");
}

export async function updateDiscount() {
    let cart = (await getCart()) ?? (await createCart());

    if (!cart.Coupon) {
        const updatedCart = await prisma.cart.update({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        Product: {
                            include: {
                                DealerPrice: true,
                                Brand: true,
                                Category: true,
                                SubCategory: true,
                            },
                        },
                    },
                },
                Coupon: true,
            },
            data: { discount: 0 },
        });

        const size = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        const subtotal = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.Product.price,
            0
        );

        const total = subtotal + cart.shipping - cart.discount;

        cart = {
            ...updatedCart,
            size,
            subtotal,
            total,
        };
    } else {
        if (
            cart.Coupon.minPurchase &&
            cart.Coupon.minPurchase > cart.subtotal + cart.shipping
        ) {
            await prisma.cart.update({
                where: {
                    id: cart.id,
                },
                data: {
                    Coupon: { disconnect: true },
                    discount: 0,
                },
            });
        } else {
            let discount = 0;

            if (cart.Coupon.discountType === "PERCENT") {
                discount = cart.subtotal * (cart.Coupon.discount / 100);
            } else if (cart.Coupon.discountType === "FIXED") {
                discount = cart.Coupon.discount;
            }

            await prisma.cart.update({
                where: {
                    id: cart.id,
                },
                data: {
                    discount,
                },
            });
        }
    }
}
