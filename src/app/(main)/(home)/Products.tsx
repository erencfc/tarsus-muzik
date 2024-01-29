"use client";

import Carousel from "./Carousel";
import { Prisma, Role } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Ratings";
import { CarouselItem } from "@/components/ui/carousel";
import { formatPrice } from "@/lib/format";
import { useCurrentUser } from "@/hooks/useCurrentUser";

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
            DealerPrice: {
                select: {
                    Dealer: {
                        select: {
                            userId: true;
                        };
                    };
                    price: true;
                };
            };
        };
    }>[];
    title: string;
};

export default function Products({ products, title }: ProductsProps) {
    const currentUser = useCurrentUser();

    if (!products) return <div>loading from Products.tsx</div>;

    const prices = (product: any) => {
        if (currentUser?.role !== Role.DEALER) return { price: product.price };

        const dealerPrice = product.DealerPrice.find(
            (dealerPrice) => dealerPrice.Dealer.userId === currentUser.id
        )?.price;

        return {
            dealerPrice,
            price: product.price,
        };
    };

    return (
        <div className="container mx-auto flex max-w-6xl flex-col gap-6">
            <div className="flex w-full flex-col gap-3">
                <h4 className="text-center text-xl font-bold text-gray-700 sm:text-start">
                    {title}
                </h4>
            </div>

            <Carousel>
                {products.map((product) => (
                    <CarouselItem
                        key={product.id}
                        className="basis-full p-0 py-2 sm:basis-1/2 min-[850px]:basis-1/3"
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
                                <span className="text-lg font-extrabold text-gray-900">
                                    {currentUser?.role === Role.DEALER ? (
                                        <>
                                            {prices(product).dealerPrice ? (
                                                <span className="mr-1 text-sm text-gray-700 line-through">
                                                    {formatPrice(
                                                        prices(product).price
                                                    )}
                                                </span>
                                            ) : null}

                                            {formatPrice(
                                                prices(product)?.dealerPrice ||
                                                    prices(product).price
                                            )}
                                        </>
                                    ) : (
                                        formatPrice(prices(product).price)
                                    )}
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
