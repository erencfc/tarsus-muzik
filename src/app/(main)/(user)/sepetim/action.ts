"use server";

import { getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { updateDiscount } from "./cart";
import { formatPrice } from "@/lib/format";

export async function applyCoupon(
    couponCode: string
): Promise<{ message: string; success: boolean }> {
    const cart = await getCart();

    if (!cart) {
        return {
            message: "Bir hata oluştu sayfayı yenileyip tekrar deneyin.",
            success: false,
        };
    }

    const coupon = await prisma.coupon.findUnique({
        where: {
            code: couponCode,
        },
    });

    if (!coupon) {
        return {
            message: "Kupon kodu bulunamadı.",
            success: false,
        };
    }

    if (cart.Coupon) {
        return {
            message: "Zaten sepetinizde bir kupon var.",
            success: false,
        };
    }

    if (
        coupon.minPurchase &&
        coupon.minPurchase > cart.subtotal + cart.shipping
    ) {
        return {
            message: `Kupon kodunu kullanmak için en az ${formatPrice(
                coupon.minPurchase
            )} tutarında alışveriş yapmalısınız.`,
            success: false,
        };
    }

    await prisma.cart.update({
        where: {
            id: cart.id,
        },
        data: {
            Coupon: {
                connect: {
                    code: couponCode,
                },
            },
        },
    });

    await updateDiscount();

    revalidatePath("/sepetim");

    return {
        message: "Kupon başarıyla uygulandı.",
        success: true,
    };
}
