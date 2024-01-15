"use server";

import ToggleFavoriteButton from "@/components/ToggleFavoriteButton";
import { prisma } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/format";
import { UserPayload } from "@/types/UserPayload";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default async function Favorites({ user }: { user: UserPayload }) {
    const data = await prisma.favorite.findMany({
        where: {
            userId: user.id,
        },
    });

    const favorites = data.map((favorite) => favorite.productId);

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: favorites,
            },
        },
    });

    if (!products || products.length === 0)
        return (
            // favori ürününüz bulunmamaktadır
            <div className="flex h-[672px] min-h-[250px] flex-col">
                <h1 className="text-2xl font-bold">Favori Ürünlerim</h1>
                <p className="flex flex-col text-sm text-gray-500 before:mb-2 before:mt-2 before:h-[1px] before:w-full before:bg-black/30">
                    Favori ürününüz bulunmamaktadır.
                </p>
            </div>
        );

    return (
        <div>
            <h1 className="text-2xl font-bold">Favori Ürünlerim</h1>
            <div className="h-[672px] min-h-[250px] overflow-auto">
                <div>
                    <table className="table table-pin-rows table-pin-cols table-lg mt-2">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>

                        {products.map((product) => (
                            <tbody key={product.id}>
                                <tr>
                                    <th>
                                        <div className="flex items-center justify-center">
                                            <ToggleFavoriteButton
                                                productId={product.id}
                                                user={user}
                                            >
                                                <XMarkIcon
                                                    width={20}
                                                    height={20}
                                                    className="text-red-500 hover:text-red-900"
                                                />
                                            </ToggleFavoriteButton>
                                        </div>
                                    </th>
                                    <th>
                                        <Link
                                            href={`/urun/${product.modelSlug}`}
                                        >
                                            <Image
                                                src={product.images[0]}
                                                width={80}
                                                height={80}
                                                className="mix-blend-darken"
                                                alt={product.model}
                                            />
                                        </Link>
                                    </th>
                                    <td>
                                        <Link
                                            href={`/urun/${product.modelSlug}`}
                                        >
                                            <span className="line-clamp-2 text-sm font-bold text-black/60 hover:text-primary hover:underline">
                                                {product.model}
                                            </span>
                                        </Link>
                                    </td>

                                    <td className="max-w-xs break-words text-sm">
                                        <span className="font-bold">
                                            {formatPrice(product.price)}
                                        </span>
                                    </td>
                                    <td>
                                        <AddToCartButton product={product} />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}
