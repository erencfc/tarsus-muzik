import { Dealer, Prisma } from "@prisma/client";
import Link from "next/link";

import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";

import BrandFilter from "../../../../../components/BrandFilter";
import PriceFilter from "../../../../../components/PriceFilter";

import { getCategoryBySlug } from "@/lib/db/category";
import { getPath } from "@/lib/format";
import { getProductCountBySlug } from "@/lib/db/product";
import { getBrandCount } from "@/lib/db/brand";
import SortBy from "../../../../../components/SortBy";
import ProductList from "@/components/ProductList";
import { currentUser } from "@/lib/auth";
import { getDealerByUserId } from "@/lib/db/dealer";
import PaginationComponent from "@/components/PaginationNew";
import { Suspense } from "react";

type CategoryProductsProps = {
    categorySlug: string;
    subCategorySlug: string;
    currentPage: number;
    itemsPerPage: number;
    brands: string[];
    min: number;
    max: number;
    sort: string;
};

export default async function CategoryProducts({
    categorySlug,
    subCategorySlug,
    currentPage,
    itemsPerPage,
    brands,
    min,
    max,
    sort,
}: CategoryProductsProps) {
    let filter: Prisma.ProductWhereInput = subCategorySlug
        ? {
              Category: {
                  slug: categorySlug,
              },
              SubCategory: {
                  slug: subCategorySlug,
              },
          }
        : {
              Category: {
                  slug: categorySlug,
              },
          };

    if (brands.length > 0) {
        filter = {
            ...filter,
            Brand: {
                slug: {
                    in: brands,
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

    const category = await getCategoryBySlug({
        categorySlug,
        select: {
            id: true,
            name: true,
            slug: true,
            SubCategory: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            Product: {
                select: {
                    id: true,
                    model: true,
                    modelSlug: true,
                    images: true,
                    rating: true,
                    price: true,
                    DealerPrice: true,
                    Favorite: true,
                    _count: {
                        select: {
                            Comment: true,
                        },
                    },
                },
                where: {
                    ...filter,
                },
                orderBy,
                skip: (currentPage - 1) * itemsPerPage,
                take: itemsPerPage,
            },
        },
    });

    if (!category) {
        return null;
    }

    const subCategory = category.SubCategory.find(
        (subCat) => subCat.slug === subCategorySlug
    );

    const totalItemCount = await getProductCountBySlug({
        categorySlug,
        subCategorySlug: subCategory?.slug || null,
        filter,
    });
    let where: Prisma.ProductWhereInput = {
        Category: {
            slug: categorySlug,
        },
    };
    if (subCategory) {
        where.SubCategory = {
            slug: subCategorySlug,
        };
    }

    const brandCount = await getBrandCount({
        where,
    });

    const user = await currentUser();
    let dealer: Dealer | null = null;
    if (user) {
        dealer = await getDealerByUserId({ userId: user.id });
    }

    return (
        <div className="grid w-full lg:grid-cols-[280px_1fr]">
            <aside className="hidden h-fit rounded-lg border border-gray-300 lg:block">
                <Card className="border-none bg-base-100 text-gray-800 dark:border-none dark:bg-base-100 dark:text-gray-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold">
                            {subCategory ? subCategory.name : category.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ul>
                            {!subCategory &&
                                category.SubCategory.map((subCategory) => (
                                    <li
                                        className="group"
                                        key={subCategory.slug}
                                    >
                                        <Link
                                            href={getPath(
                                                category.slug,
                                                subCategory.slug
                                            )}
                                            className="flex flex-row items-center"
                                        >
                                            <label className="label flex cursor-pointer justify-start gap-2 pl-0 text-primary">
                                                <ChevronDoubleRightIcon
                                                    width={16}
                                                    height={16}
                                                />
                                            </label>
                                            <span
                                                className={
                                                    "label-text font-medium transition-colors duration-150 ease-in-out group-hover:text-primary"
                                                }
                                            >
                                                {subCategory.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}

                            <li className="flex flex-col before:mt-2 before:h-[1px] before:w-full before:rounded-lg before:bg-zinc-300 before:content-[''] after:h-[1px] after:w-full after:rounded-lg after:bg-zinc-300 after:content-['']">
                                <Link
                                    href={
                                        subCategory
                                            ? getPath(category.slug)
                                            : "/"
                                    }
                                    className="flex flex-row items-center py-1"
                                >
                                    <label className="label flex cursor-pointer justify-start gap-2 pl-0 text-accent">
                                        <ChevronDoubleLeftIcon
                                            width={20}
                                            height={20}
                                        />
                                    </label>
                                    <span className="label-text font-bold transition-colors duration-150 ease-in-out group-hover:text-accent">
                                        {subCategory
                                            ? category.name
                                            : "Ana Sayfa"}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <BrandFilter brands={brandCount} />
                        <PriceFilter />
                    </CardContent>
                </Card>
            </aside>

            <main className="flex max-h-full min-w-[290px] flex-col justify-between space-y-8 px-6">
                <div className="flex flex-col gap-4">
                    <div className="flex min-h-[70px] justify-between gap-4 lg:min-h-fit">
                        <div className="flex flex-col justify-between">
                            <h1 className="text-2xl font-semibold">
                                {subCategory ? subCategory.name : category.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {totalItemCount} adet ürün bulundu.
                            </p>
                        </div>

                        <div className="flex flex-col justify-between ">
                            <SortBy />
                            <Drawer>
                                <DrawerTrigger className="ml-auto w-fit lg:hidden">
                                    Filtrele
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <div className="space-y-6 text-gray-300 dark:text-gray-300">
                                            <BrandFilter brands={brandCount} />
                                            <PriceFilter />
                                        </div>
                                    </DrawerHeader>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductList
                            products={category.Product.map((p) => p) as any}
                            dealerId={dealer?.id}
                            user={user}
                        />
                    </Suspense>
                </div>

                <PaginationComponent
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItemCount}
                    href={getPath(categorySlug, subCategorySlug)}
                />
            </main>
        </div>
    );
}
