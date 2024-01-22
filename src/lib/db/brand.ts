"use server";

import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { formatSlug } from "../format";

export const getBrandCount = async ({
    where,
}: {
    where: Prisma.ProductWhereInput;
}) => {
    const brands = (
        await prisma.product.findMany({
            where,
            select: { Brand: { select: { name: true, slug: true } } },
        })
    ).map(({ Brand: { name, slug } }) => ({
        name,
        slug,
    }));

    const brandCount = Object.entries(
        brands.reduce((acc, { name }) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, count]) => ({
        name,
        slug: formatSlug(name),
        count: count as number,
    }));

    return brandCount;
};
