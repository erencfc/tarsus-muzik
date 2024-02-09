"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { formatSlug } from "../format";

export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        include: {
            SubCategory: true,
        },
    });
    return categories;
};

export const getCategoryBySlug = async ({
    categorySlug,
    select,
}: {
    categorySlug: string;
    select?: Prisma.CategorySelect;
}) => {
    const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
        select,
    });

    return category;
};

export const getCategoryCount = async ({
    where,
}: {
    where: Prisma.ProductWhereInput;
}) => {
    const categories = (
        await prisma.product.findMany({
            where,
            select: { Category: { select: { name: true, slug: true } } },
        })
    ).map(({ Category: { name, slug } }) => ({
        name,
        slug,
    }));

    const categoryCount = Object.entries(
        categories.reduce((acc, { name }) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, count]) => ({
        name,
        slug: formatSlug(name),
        count: count as number,
    }));

    return categoryCount;
};
