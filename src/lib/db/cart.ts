import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Dealer, Prisma } from "@prisma/client";
import { currentUser } from "../auth";

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

    const localCartId = cookies().get("localCartId")?.value;

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
        cart =
            (await prisma.cart.findFirst({
                where: {
                    userId: user.id,
                },
                include,
            })) ?? null;

        const localCart = localCartId
            ? await prisma.cart.findUnique({
                  where: {
                      id: localCartId,
                  },
                  include,
              })
            : null;

        if (localCart && !cart && localCart.userId !== user.id) return null;

        if (localCart && !cart) {
            await prisma.cart.update({
                where: {
                    id: localCart.id,
                },
                data: {
                    User: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });

            cart = await prisma.cart.findFirst({
                where: {
                    userId: user.id,
                },
                include,
            });
        }

        if (cart && localCart && cart.items.length === 0) {
            if (localCart.items.length > 0) {
                await prisma.cart.update({
                    where: {
                        id: cart.id,
                    },
                    data: {
                        items: {
                            createMany: {
                                data: localCart.items.map((item) => ({
                                    productId: item.productId,
                                    quantity: item.quantity,
                                })),
                            },
                        },
                    },
                });

                cart = await prisma.cart.findFirst({
                    where: {
                        userId: user.id,
                    },
                    include,
                });
            }
        }
    } else {
        cart = localCartId
            ? await prisma.cart.findUnique({
                  where: {
                      id: localCartId,
                  },
                  include,
              })
            : null;

        if (cart?.userId) return null;
    }

    if (!cart) {
        return null;
    }

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
        where: {
            id: cart.id,
        },
        data: {
            discount,
        },
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
            secure: process.env.NODE_ENV === "production",
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
