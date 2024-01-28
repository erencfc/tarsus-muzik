import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { Dealer, Prisma } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { ObjectId } from "mongodb";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: {
        items: {
            include: {
                Product: {
                    include: {
                        DealerPrice: true;
                        Brand: true;
                        Category: true;
                        SubCategory: true;
                    };
                };
            };
        };
        Coupon: true;
    };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {
        Product: {
            include: {
                DealerPrice: true;
            };
        };
    };
}>;

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
    total: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    const user = await currentUser();
    let dealer: Dealer | null = null;

    if (user)
        dealer = await prisma.dealer.findUnique({
            where: {
                userId: user.id,
            },
        });

    let cart: CartWithProducts | null = null;

    let localCartId = cookies().get("localCartId")?.value;
    if (!ObjectId.isValid(localCartId)) localCartId = null;

    if (!user && !localCartId) return null;

    const include = {
        items: {
            include: {
                Product: {
                    include: {
                        DealerPrice: true,
                        Brand: {
                            select: {
                                name: true,
                                slug: true,
                            },
                        },
                        Category: true,
                        SubCategory: true,
                    },
                },
            },
        },
        Coupon: true,
    };

    if (user) {
        cart = await prisma.cart.findFirst({
            where: { userId: user.id },
            include,
        });
    } else if (localCartId) {
        cart = await prisma.cart.findFirst({
            where: { id: localCartId },
            include,
        });
    } else return null;

    if (user && !cart) {
        if (!localCartId) return null;
        const localCart = await prisma.cart.findFirst({
            where: { id: localCartId },
            select: { id: true },
        });
        if (!localCart) return null;

        cart = await prisma.cart.update({
            where: { id: localCart.id },
            data: {
                User: {
                    connect: {
                        id: user.id,
                    },
                },
            },
            include,
        });
    }
    if (cart.userId && cart.userId !== user?.id) return null;

    const size = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    const subtotal = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.Product.price,
        0
    );

    let discount = 0;

    if (cart.Coupon?.discountType === "PERCENT") {
        discount = subtotal * (cart.Coupon.discount / 100);
    } else if (cart.Coupon?.discountType === "FIXED") {
        discount = cart.Coupon.discount;
    }

    if (dealer) {
        cart.items.forEach((item) => {
            item.Product.DealerPrice.find((price) => {
                if (price.dealerId === dealer?.id) {
                    discount +=
                        (item.Product.price - price.price) * item.quantity;
                    return true;
                }
            });
        });
    }

    await prisma.cart.update({
        where: { id: cart.id },
        data: { discount },
    });

    cart.discount = discount;

    const total = subtotal + cart.shipping - discount;

    return {
        ...cart,
        size,
        subtotal,
        total,
    };
}

export async function createCart(): Promise<ShoppingCart> {
    const user = await currentUser();
    let newCart: Prisma.CartGetPayload<{
        include: {
            Coupon: true;
        };
    }>;

    if (user) {
        newCart = await prisma.cart.create({
            data: {
                User: {
                    connect: {
                        id: user.id,
                    },
                },
            },
            include: {
                Coupon: true,
            },
        });
    } else {
        newCart = await prisma.cart.create({
            data: {},
            include: {
                Coupon: true,
            },
        });

        //! NOTE: Needs encryption + secure settings
        cookies().set("localCartId", newCart.id, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 365,
            // secure: process.env.NODE_ENV === "production",
        });
    }

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
        total: 0,
    };
}
