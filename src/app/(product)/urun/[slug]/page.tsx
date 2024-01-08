"use server";

import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import ProductDetails from "@/components/Product/Details";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import Tabs from "./Tabs";
import Loading from "@/app/loading";
import Link from "next/link";

const getUserFavorites = cache(async (userId: string) => {
    const favorites = await prisma.favorite.findMany({
        where: {
            User: {
                id: userId,
            },
        },
    });
    return favorites.map((favorite) => favorite.productId);
});

const isFavorite = cache(async (productId: string): Promise<boolean> => {
    const session = await getServerSession(authOptions);
    if (!session?.user) return false;
    const favorites = await getUserFavorites(session.user.id);
    return favorites.includes(productId);
});

const getProduct = cache(async (modelSlug: string) => {
    const product = await prisma.product.findUnique({
        where: {
            modelSlug,
        },
        include: {
            Brand: true,
            SubCategory: true,
            Category: true,
        },
    });
    if (!product) {
        notFound();
    }
    return product;
});

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const modelSlug = params.slug;
    const product = await getProduct(modelSlug);

    return {
        title: `${product?.model} - Tarsus Müzik Market`,
        description: `${product?.model} - Tarsus Müzik Market`,
        // openGraph: {
        //     images: [{ url: product.images[0], alt: product.model }],
        // },
    };
}

export default async function ProductPage({
    params: { slug: modelSlug },
}: {
    params: { slug: string };
}) {
    const product = await getProduct(modelSlug);
    const commentLength = await prisma.comment.count({
        where: {
            productId: product.id,
        },
    });
    const isFav = await isFavorite(product.id);

    return (
        <div className="m-auto flex min-w-[300px] max-w-6xl flex-col gap-16 p-6">
            <div className="flex flex-col gap-6 sm:flex-row">
                <div className="max-w-sm">
                    <div className="carousel w-full">
                        {product.images.map((image, index) => (
                            <div
                                id={`item${index + 1}`}
                                key={index + 1}
                                className="carousel-item w-full"
                            >
                                <div className="h-fit max-h-fit border border-solid border-gray-300/50 p-8">
                                    <Image
                                        src={image}
                                        alt={product.model}
                                        width={400}
                                        height={400}
                                        className="mix-blend-darken"
                                        priority
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 py-2">
                        {product.images.map((image, index) => (
                            <Link
                                href={`#item${index + 1}`}
                                key={index + 1}
                                className="border border-solid border-gray-300/50 p-1"
                            >
                                <Image
                                    src={image}
                                    alt={product.model}
                                    width={80}
                                    height={80}
                                    className="min-h-[46px] w-20 mix-blend-darken"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <Suspense fallback={<Loading />}>
                    <ProductDetails product={product} isFavorite={isFav} />
                </Suspense>
            </div>

            <Tabs product={product} commentLength={commentLength} />
        </div>
    );
}
