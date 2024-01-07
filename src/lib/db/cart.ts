import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: {
        items: {
            include: {
                Product: {
                    include: { Brand: true; Category: true; SubCategory: true };
                };
            };
        };
        Coupon: true;
    };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {
        Product: true;
    };
}>;

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
    total: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    const localCartId = cookies().get("localCartId")?.value;

    let cart = localCartId
        ? await prisma.cart.findUnique({
              where: {
                  id: localCartId,
              },
              include: {
                  items: {
                      include: {
                          Product: {
                              include: {
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
              },
          })
        : null;

    if (!cart) {
        return null;
    }

    if (cart.Coupon) {
        let discount = 0;

        const size = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        const subtotal = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.Product.price,
            0
        );

        if (cart.Coupon.discountType === "PERCENT") {
            discount = subtotal * (cart.Coupon.discount / 100);
        } else if (cart.Coupon.discountType === "FIXED") {
            discount = cart.Coupon.discount;
        }

        const total = subtotal + cart.shipping - discount;

        await prisma.cart.update({
            where: {
                id: cart.id,
            },
            data: {
                discount,
            },
        });

        cart.discount = discount;

        return {
            ...cart,
            size,
            subtotal,
            total,
        };
    } else {
        const size = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        const subtotal = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.Product.price,
            0
        );

        const total = subtotal + cart.shipping;

        return {
            ...cart,
            size,
            subtotal,
            total,
        };
    }
}

export async function createCart(): Promise<ShoppingCart> {
    const newCart = await prisma.cart.create({
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

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
        total: 0,
    };
}
