"use server";

import { Prisma, Role } from "@prisma/client";
import { currentRole } from "../auth";
import { prisma } from "./prisma";

export async function getProductCount(): Promise<number> {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return 0;
    }

    try {
        const count = await prisma.product.count();

        return count;
    } catch (error: any) {
        console.error(error);

        return 0;
    }
}

export const getProducts = async ({
    currentPage,
    itemsPerPage,
    q,
}: {
    currentPage: number;
    itemsPerPage: number;
    q?: string;
}) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return [];
    }

    let where: Prisma.ProductWhereInput = {};

    if (q?.length > 0) {
        where = {
            OR: [
                {
                    model: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
                {
                    modelSlug: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
            ],
        };
    }

    const products = await prisma.product.findMany({
        where,
        select: {
            id: true,
            images: true,
            model: true,
            price: true,
            stock: true,
            stockStatus: true,
            createdAt: true,
            modelSlug: true,
            Category: { select: { name: true, color: true, slug: true } },
            SubCategory: { select: { name: true } },
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    return products;
};

export const searchProducts = async (q: string) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return [];
    }

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    model: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
                {
                    modelSlug: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
            ],
        },
        include: {
            Category: true,
            SubCategory: true,
            Brand: true,
        },
    });

    return products;
};

export const fetchPopularProducts = async () => {
    const popularProducts = await prisma.product.findMany({
        take: 12,
        orderBy: [
            {
                Comment: {
                    _count: "desc",
                },
            },
            {
                rating: "desc",
            },
        ],
        include: {
            _count: {
                select: {
                    Comment: true,
                },
            },
            Favorite: {
                select: {
                    userId: true,
                },
            },
            DealerPrice: {
                select: {
                    Dealer: {
                        select: {
                            userId: true,
                        },
                    },
                    price: true,
                },
            },
        },
    });

    return popularProducts;
};
export const fetchNewProducts = async () => {
    const newProducts = await prisma.product.findMany({
        take: 12,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: {
                    Comment: true,
                },
            },
            Favorite: {
                select: {
                    userId: true,
                },
            },
            DealerPrice: {
                select: {
                    Dealer: {
                        select: {
                            userId: true,
                        },
                    },
                    price: true,
                },
            },
        },
    });

    return newProducts;
};
