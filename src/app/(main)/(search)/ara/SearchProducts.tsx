import BrandFilter from "@/components/BrandFilter";
import PriceFilter from "@/components/PriceFilter";
import ProductList from "@/components/ProductList";
import SortBy from "@/components/SortBy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { currentUser } from "@/lib/auth";
import { getBrandCount } from "@/lib/db/brand";
import { getCategoryCount } from "@/lib/db/category";
import { getDealerByUserId } from "@/lib/db/dealer";
import { prisma } from "@/lib/db/prisma";
import { Dealer, Prisma } from "@prisma/client";
import { Suspense } from "react";
import CategoryFilter from "./CategoryFilter";
import PaginationComponent from "@/components/PaginationNew";

type SearchProductsProps = {
    q: string;
    category?: string[];
    currentPage: number;
    itemsPerPage: number;
    brands: string[];
    min: number;
    max: number;
    sort: string;
};

export default async function SearchProducts({
    q,
    category,
    currentPage,
    itemsPerPage,
    brands,
    min,
    max,
    sort,
}: SearchProductsProps) {
    if (!q || q.length < 3) {
        return (
            <div className="mt-2 flex h-[500px] flex-col items-center">
                <h1 className="text-xl font-semibold">
                    Arama sorgusu en az 3 karakterden oluşmalıdır.
                </h1>
            </div>
        );
    }

    let filter: Prisma.ProductWhereInput = {
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

    if (category?.length > 0) {
        filter = {
            ...filter,
            Category: {
                slug: {
                    in: category,
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

    const products = await prisma.product.findMany({
        where: {
            ...filter,
        },
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
        orderBy,
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    const totalItemCount = await prisma.product.count({ where: { ...filter } });

    const where: Prisma.ProductWhereInput = {
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
    const brandCount = await getBrandCount({ where });
    const categoryCount = await getCategoryCount({ where });

    if (!products) {
        return null;
    }

    const user = await currentUser();
    let dealer: Dealer | null = null;
    if (user) {
        dealer = await getDealerByUserId({ userId: user.id });
    }

    return (
        <div className="grid w-full lg:grid-cols-[280px_1fr]">
            <aside className="hidden h-fit rounded-lg border border-gray-300 lg:block">
                <Card className="dark:border-none dark:bg-base-100 dark:text-gray-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold">
                            Kategoriler
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <CategoryFilter categories={categoryCount} />
                        <BrandFilter brands={brandCount} />
                        <PriceFilter />
                    </CardContent>
                </Card>
            </aside>

            <main className="flex max-h-full min-w-[290px] flex-col justify-between space-y-8 px-6">
                <div className="flex flex-col gap-4">
                    <div className="flex min-h-[70px] justify-between gap-4 lg:min-h-fit">
                        <div className="flex flex-col justify-between">
                            <h1 className="text-2xl font-semibold" title={q}>
                                {q.length > 20 ? `${q.slice(0, 20)}...` : q}{" "}
                                için arama sonuçları
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
                                        <div className="space-y-6 dark:text-gray-300">
                                            <BrandFilter brands={brandCount} />
                                            <PriceFilter />
                                        </div>
                                    </DrawerHeader>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        {totalItemCount > 0 ? (
                            <ProductList
                                products={products.map((p) => p) as any}
                                dealerId={dealer?.id}
                                user={user}
                            />
                        ) : (
                            <div className="mt-2 flex h-[500px] flex-col items-center">
                                <h1 className="text-2xl font-semibold">
                                    Aradığınız kriterlerde ürün bulunamadı.
                                </h1>
                            </div>
                        )}
                    </Suspense>
                </div>

                {totalItemCount > 0 && (
                    <PaginationComponent
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItemCount}
                        href="/ara"
                    />
                )}
            </main>
        </div>
    );
}
