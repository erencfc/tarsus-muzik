"use client";

import { incrementProductQuantity } from "@/app/(main)/(product)/urun/[slug]/actions";
import { formatPrice } from "@/lib/format";
import { EyeIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import ToggleFavoriteButton from "./ToggleFavoriteButton";

export default function ProductList({
    products,
    user,
    dealerId,
}: {
    products: Prisma.ProductGetPayload<{
        include: {
            DealerPrice: true;
            Favorite: true;
            _count: {
                select: {
                    Comment: true;
                };
            };
        };
    }>[];
    user: any;
    dealerId: string;
}) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [pendingProduct, setPendingProduct] = useState("");
    const [addedProducts, setAddedProducts] = useState<string[]>([]);

    const getRatingStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating - i > 0) {
                stars.push(
                    <StarIconFilled
                        key={i}
                        width={18}
                        height={18}
                        className="mb-0.5 text-yellow-500"
                    />
                );
            } else {
                stars.push(
                    <StarIcon
                        key={i}
                        width={18}
                        height={18}
                        className="mb-0.5 text-yellow-500"
                    />
                );
            }
        }
        return <div className="flex">{stars}</div>;
    };

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {products.map((product) => {
                let isFavorite = false;
                if (product.Favorite && product.Favorite.length > 0) {
                    if (
                        product.Favorite.map((fav) => fav.userId).includes(
                            user?.id
                        )
                    )
                        isFavorite = true;
                }

                const handleAddToCart = () => {
                    setPendingProduct(product.id);
                    setSuccess(false);
                    startTransition(async () => {
                        await incrementProductQuantity(product.id);
                        setSuccess(true);
                        setAddedProducts((prev) => [...prev, product.id]);
                        setTimeout(() => {
                            setSuccess(false);
                            setPendingProduct("");
                            setAddedProducts([]);
                        }, 3000);
                    });
                };

                return (
                    <div
                        className="group flex min-h-[30rem] flex-col items-center rounded-lg border border-solid border-gray-300/70 p-2 py-4 shadow-lg transition duration-200 ease-out hover:shadow-2xl" // hover:-translate-y-1 hover:scale-[1.02]"
                        key={product.modelSlug}
                    >
                        <Link
                            href={`/urun/${product.modelSlug}`}
                            className="relative h-5/6 w-full"
                        >
                            <div className="flex h-full flex-col justify-between">
                                <div className="flex w-full justify-center">
                                    <h4
                                        className="line-clamp-2 h-12 py-1 text-center text-sm font-semibold text-black/70"
                                        title={product.model}
                                    >
                                        {product.model}
                                    </h4>
                                </div>

                                <div className="h-full w-full pt-6">
                                    <div className="flex items-center justify-center">
                                        <Image
                                            alt={product.model}
                                            className="mb-2 h-[200px] w-[200px] object-cover mix-blend-darken transition duration-300 ease-in group-hover:scale-90"
                                            height="200"
                                            width="200"
                                            src={product.images[0]}
                                            style={{
                                                aspectRatio: "200/200",
                                                objectFit: "cover",
                                            }}
                                            priority={false}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center justify-center gap-2">
                                    <div className="flex items-center gap-2">
                                        {getRatingStars(product.rating)}
                                    </div>
                                    -
                                    <span className="text-xs font-semibold text-gray-700">
                                        {product._count.Comment} Yorum
                                    </span>
                                </div>
                                <p className="items-end text-center text-lg font-bold">
                                    {product.DealerPrice.find(
                                        (dealerPrice) =>
                                            dealerPrice.dealerId === dealerId
                                    )?.price && (
                                        <span className="mr-1 text-sm text-gray-400 line-through">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                    {formatPrice(
                                        product.DealerPrice.find(
                                            (dealerPrice) =>
                                                dealerPrice.dealerId ===
                                                dealerId
                                        )?.price || product.price
                                    )}
                                </p>
                            </div>

                            <span className="absolute right-1.5 top-16 flex rounded-sm rounded-bl-lg rounded-tr-lg bg-black bg-opacity-50 p-1.5 text-white sm:hidden sm:group-hover:flex">
                                <div className="flex flex-col items-center gap-0.5 [&>*:not(:last-child)]:flex [&>*:not(:last-child)]:flex-col [&>*:not(:last-child)]:after:mt-1.5 [&>*:not(:last-child)]:after:h-[1px] [&>*:not(:last-child)]:after:w-full [&>*:not(:last-child)]:after:bg-white/50 [&>*:not(:last-child)]:after:content-['']">
                                    <div>
                                        <span className="transition-colors duration-200 ease-out hover:text-accent">
                                            <EyeIcon
                                                width={20}
                                                height={20}
                                                className="inline-flex"
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <ToggleFavoriteButton
                                            user={user}
                                            product={product}
                                        >
                                            {isFavorite ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    className="inline-flex"
                                                >
                                                    <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
                                                </svg>
                                            ) : (
                                                <HeartIcon
                                                    width={20}
                                                    height={20}
                                                    className="inline-flex"
                                                />
                                            )}
                                        </ToggleFavoriteButton>
                                    </div>
                                </div>
                            </span>
                        </Link>

                        <div className="visible mt-3 flex w-full flex-col gap-4 px-4 group-hover:visible sm:invisible">
                            <button
                                className={`btn btn-primary btn-sm btn-block text-white ${
                                    isPending && pendingProduct === product.id
                                        ? "btn-disabled"
                                        : ""
                                }`}
                                onClick={handleAddToCart}
                            >
                                <span className="w-full text-center">
                                    Sepete Ekle
                                </span>
                            </button>
                        </div>

                        {isPending && pendingProduct === product.id ? (
                            <span className="loading loading-spinner loading-sm mt-4 text-primary"></span>
                        ) : (
                            success &&
                            addedProducts.includes(product.id) && (
                                <span className="mt-4 text-green-500">
                                    Sepete Eklendi!
                                </span>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
}
