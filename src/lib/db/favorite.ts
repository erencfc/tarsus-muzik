"use server";

import { prisma } from "@/lib/db/prisma";

export const getFavoritesByUserId = async ({ userId }: { userId: string }) => {
    const favorites = await prisma.favorite.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            Product: {
                select: {
                    id: true,
                    model: true,
                    modelSlug: true,
                    images: true,
                    price: true,
                    DealerPrice: {
                        select: {
                            Dealer: {
                                select: {
                                    userId: true,
                                },
                            },
                            productId: true,
                            price: true,
                        },
                    },
                },
            },
        },
    });

    return favorites;
};
