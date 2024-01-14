"use server";

import { prisma } from "@/lib/db/prisma";
import { Suspense, cache } from "react";
import Loading from "../loading";
import Product from "./Product";

const getProducts = cache(async () => {
    const products = await prisma.product.findMany({
        take: 12,
        orderBy: {
            rating: "desc",
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
        },
    });

    return products;
});

export default async function PopularProducts({ Carousel }: { Carousel: any }) {
    const products = await getProducts();

    return (
        <Suspense fallback={<Loading />}>
            <div className="container mx-auto flex max-w-6xl flex-col gap-6">
                <div className="flex w-full flex-col gap-3">
                    <h4 className="text-center text-xl font-bold text-gray-700 sm:text-start">
                        Popüler Ürünler
                    </h4>
                </div>

                <Carousel>
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </Carousel>
            </div>
        </Suspense>
    );
}
