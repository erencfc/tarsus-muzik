"use server";

import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export const getProducts = async ({
    category,
    subCategory,
    currentPage,
    itemsPerPage,
    brands,
    min,
    max,
    sort,
    user,
}: {
    category: string;
    subCategory?: string;
    currentPage: number;
    itemsPerPage: number;
    brands: string | null;
    min: number | null;
    max: number | null;
    sort: string;
    user: any;
}) => {
    let filter = subCategory
        ? {
              Category: {
                  slug: category,
              },
              SubCategory: {
                  slug: subCategory,
              },
          }
        : ({
              Category: {
                  slug: category,
              },
          } as any);

    const brandsArray = brands ? brands.split(",") : null;

    if (brands && brands.length > 0) {
        filter = {
            ...filter,
            Brand: {
                slug: {
                    in: brandsArray,
                },
            },
        };
    }

    filter.price = {};
    if (min) {
        filter.price.gte = min;
    }
    if (max) {
        filter.price.lte = max;
    }

    let orderBy = {};

    if (sort === "yeni") orderBy = { id: "desc" };
    else if (sort === "eski") orderBy = { id: "asc" };
    else if (sort === "dusuk") orderBy = { price: "asc" };
    else if (sort === "yuksek") orderBy = { price: "desc" };
    else if (sort === "az") orderBy = { model: "asc" };
    else if (sort === "za") orderBy = { model: "desc" };
    else orderBy = { id: "desc" };

    let include = {
        Brand: true,
        Category: true,
        SubCategory: true,
        _count: {
            select: {
                Comment: true,
            },
        },
    } as Prisma.ProductInclude;

    if (user) {
        include = {
            ...include,
            Favorite: {
                where: {
                    userId: user.id,
                },
                select: {
                    userId: true,
                },
            },
        };
    }

    const products = (await prisma.product.findMany({
        where: {
            ...filter,
        },
        orderBy,
        include,
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })) as Prisma.ProductGetPayload<{
        include: {
            _count: {
                select: {
                    Comment: true;
                };
            };
            Brand: true;
            Category: true;
            SubCategory: true;
            Favorite?: {
                select: {
                    userId: true;
                };
            };
        };
    }>[];

    const totalItemCount = await prisma.product.count({
        where: {
            ...filter,
        },
    });

    return { data: products, totalItemCount };
};
