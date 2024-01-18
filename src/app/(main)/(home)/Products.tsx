"use client";

import { Suspense } from "react";
import Loading from "@/app/loading";
import Carousel from "./Carousel";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Ratings";
import { CarouselItem } from "@/components/ui/carousel";

type ProductsProps = {
    products: Prisma.ProductGetPayload<{
        include: {
            _count: {
                select: {
                    Comment: true;
                };
            };
            Favorite: {
                select: {
                    userId: true;
                };
            };
        };
    }>[];
    title: string;
};

export default function Products({ products, title }: ProductsProps) {
    if (!products) return <div>loading from Products.tsx</div>;
    return (
        <div className="container mx-auto flex max-w-6xl flex-col gap-6">
            <div className="flex w-full flex-col gap-3">
                <h4 className="text-center text-xl font-bold text-gray-700 sm:text-start">
                    {title}
                </h4>
            </div>

            <Carousel autoplayDelay={5000}>
                {products.map((product) => (
                    <CarouselItem
                        key={product.id}
                        //? border verince en baştaki elemanın border'ı olmuyor o yüzden sağdaki elemanın da border'ını kaldırmak için 1px ekledim
                        className="basis-[calc(33.33%+1px)] p-0 py-2"
                    >
                        <Link
                            href={`/urun/${product.modelSlug}`}
                            draggable={false}
                        >
                            <div className="flex flex-col items-center justify-between gap-3 border bg-base-100 p-4 transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-lg">
                                <Image
                                    src={product.images[0]}
                                    alt={product.model}
                                    width={150}
                                    height={150}
                                    className="h-[150px] w-[150px] rounded-md object-cover mix-blend-darken"
                                    draggable={false}
                                />
                                <span className="line-clamp-1 text-center text-xs font-semibold text-gray-700">
                                    {product.model}
                                </span>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Rating rating={product.rating} />-
                                    <span className="text-xs font-semibold">
                                        {product._count.Comment} Yorum
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    );
}
