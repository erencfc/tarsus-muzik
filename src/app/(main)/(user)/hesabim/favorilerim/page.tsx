import ToggleFavoriteButton from "@/components/ToggleFavoriteButton";
import { currentUser } from "@/lib/auth";
import { getFavoritesByUserId } from "@/lib/db/favorite";
import { formatPrice } from "@/lib/format";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default async function FavoritesPage() {
    const user = await currentUser();

    const favorites = await getFavoritesByUserId({ userId: user.id });

    const products = favorites.map((favorite) => favorite.Product);

    return (
        <div className="mx-auto mt-6 max-w-6xl p-6">
            <h1 className="text-2xl font-bold">Favori Ürünlerim</h1>
            <div className="h-[672px] min-h-[250px] overflow-auto">
                {!products || products.length === 0 ? (
                    <p className="flex flex-col text-sm text-gray-500 before:mb-2 before:mt-2 before:h-[1px] before:w-full before:bg-gray-300">
                        Favori ürününüz bulunmamaktadır.
                    </p>
                ) : (
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
                                                    product={product}
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
                                                    className="min-h-[60px] min-w-[60px] mix-blend-darken"
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

                                        <td className="max-w-xs text-center text-sm">
                                            <span className="font-bold">
                                                {product.DealerPrice.find(
                                                    (dealerPrice) =>
                                                        dealerPrice.Dealer
                                                            .userId === user.id
                                                )?.price ? (
                                                    <span className="mr-1 text-xs text-gray-400 line-through">
                                                        {formatPrice(
                                                            product.price
                                                        )}
                                                    </span>
                                                ) : null}
                                                <span>
                                                    {formatPrice(
                                                        product.DealerPrice.find(
                                                            (dealerPrice) =>
                                                                dealerPrice
                                                                    .Dealer
                                                                    .userId ===
                                                                user.id
                                                        )?.price ||
                                                            product.price
                                                    )}
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <AddToCartButton
                                                product={product}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
