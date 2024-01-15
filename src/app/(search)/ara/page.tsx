"use server";

import { prisma } from "@/lib/db/prisma";
import { formatSlug } from "@/lib/format";
import { Prisma } from "@prisma/client";
import SearchPageComponent from "./SearchPage";

type SearchPageProps = {
    searchParams: { [key: string]: string | undefined };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q as string;
    const currentPage = parseInt(searchParams.sayfa || "1");
    const itemsPerPage = 12;

    let cleanQuery = query.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");

    let where: Prisma.ProductWhereInput = {
        OR: [],
    };

    cleanQuery.forEach((query) => {
        where.OR?.push(
            { model: { contains: query } },
            { modelSlug: { contains: query } }
        );
    });

    const notSkippedProducts = await prisma.product.findMany({
        where,
        select: {
            Brand: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            Category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    if (searchParams.marka) {
        where.Brand = {
            slug: searchParams.marka,
        };
    }

    const products = await prisma.product.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        select: {
            _count: {
                select: {
                    Comment: true,
                },
            },
            id: true,
            model: true,
            modelSlug: true,
            price: true,
            images: true,
            rating: true,
            Brand: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            Category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            Favorite: {
                select: {
                    userId: true,
                },
            },
        },
    });

    const allBrands = notSkippedProducts.reduce((acc: any, curr: any) => {
        const { Brand: brand } = curr;

        acc.push({
            name: brand.name,
            slug: formatSlug(brand.slug),
        });
        return acc;
    }, []);

    const brandCounts =
        allBrands.length > 0
            ? allBrands.reduce((acc: any, curr: any) => {
                  if (typeof acc[curr.name] === "undefined") {
                      acc[curr.name] = 1;
                  } else {
                      acc[curr.name] += 1;
                  }

                  return acc;
              }, {})
            : {};

    const brands = Object.entries(brandCounts).map(([key, value]) => ({
        name: key,
        slug: formatSlug(key),
        count: value as number,
    }));

    const allCategories = notSkippedProducts.reduce((acc: any, curr: any) => {
        const { Category: category } = curr;

        acc.push({
            name: category.name,
            slug: formatSlug(category.slug),
        });
        return acc;
    }, []);

    const categoryCounts =
        allCategories.length > 0
            ? allCategories.reduce((acc: any, curr: any) => {
                  if (typeof acc[curr.name] === "undefined") {
                      acc[curr.name] = 1;
                  } else {
                      acc[curr.name] += 1;
                  }

                  return acc;
              }, {})
            : {};

    const categories = Object.entries(categoryCounts).map(([key, value]) => ({
        name: key,
        slug: formatSlug(key),
        count: value as number,
    }));

    return (
        <div className="mx-auto max-w-6xl p-6">
            <SearchPageComponent
                products={products}
                brands={brands}
                categories={categories}
                itemsPerPage={itemsPerPage}
                notSkippedProducts={notSkippedProducts}
            />
        </div>
    );
}
