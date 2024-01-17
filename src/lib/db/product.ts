"use server";

import { Role } from "@prisma/client";
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
}: {
    currentPage: number;
    itemsPerPage: number;
}) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return [];
    }

    const products = await prisma.product.findMany({
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
