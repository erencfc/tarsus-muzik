import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import QuantitySelect from "./QuantitySelect";
import { getDealerByUserId } from "@/lib/db/dealer";
import { currentUser } from "@/lib/auth";

import CartRemoveItemButton from "@/components/Header/CartRemoveItemButton";
import { Dealer } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type CartEntryProps = {
    cartItem: CartItemWithProduct;
};

export default async function CartEntry({ cartItem }: CartEntryProps) {
    const user = await currentUser();
    let dealer: Dealer | null = null;
    if (user)
        dealer = await getDealerByUserId({
            userId: user.id,
            select: { id: true },
        });

    return (
        <>
            <div className="hidden flex-col after:my-2 after:h-[1px] after:w-full after:bg-gray-400/30 after:content-[''] md:flex">
                <div
                    className="my-4 flex flex-row justify-between"
                    key={cartItem.id}
                >
                    <Link href={`/urun/${cartItem.Product.modelSlug}`}>
                        <Image
                            src={cartItem.Product.images[0]}
                            width={96}
                            height={96}
                            alt={cartItem.Product.model}
                            className="h-24 w-24 border border-solid border-gray-300/40 p-1 mix-blend-darken"
                        />
                    </Link>
                    <div className="flex flex-col items-start justify-between py-2">
                        <div className="w-80 text-sm font-semibold text-gray-600">
                            <Link href={`/urun/${cartItem.Product.modelSlug}`}>
                                {cartItem.Product.model}
                            </Link>
                        </div>

                        <CartRemoveItemButton
                            iconSize={20}
                            itemId={cartItem.id}
                        />
                    </div>
                    <div className="hidden flex-col items-center justify-center text-center text-sm font-extrabold text-gray-700 min-[850px]:flex">
                        {cartItem.Product.DealerPrice.find(
                            (dealerPrice) => dealerPrice.dealerId === dealer?.id
                        )?.price ? (
                            <span className="mr-1 text-xs text-gray-400 line-through">
                                {formatPrice(cartItem.Product.price)}
                            </span>
                        ) : null}
                        <span>
                            {formatPrice(
                                cartItem.Product.DealerPrice.find(
                                    (dealerPrice) =>
                                        dealerPrice.dealerId === dealer?.id
                                )?.price || cartItem.Product.price
                            )}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <QuantitySelect cartItem={cartItem} />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center text-sm font-extrabold text-gray-700">
                        {cartItem.Product.DealerPrice.find(
                            (dealerPrice) => dealerPrice.dealerId === dealer?.id
                        )?.price ? (
                            <span className="text-xs text-gray-400 line-through">
                                {formatPrice(
                                    cartItem.Product.price * cartItem.quantity
                                )}
                            </span>
                        ) : null}
                        {formatPrice(
                            (cartItem.Product.DealerPrice.find(
                                (dealerPrice) =>
                                    dealerPrice.dealerId === dealer?.id
                            )?.price || cartItem.Product.price) *
                                cartItem.quantity
                        )}
                    </div>
                </div>
            </div>
            <div
                className="flex h-36 min-w-[186px] justify-between border-b border-t border-b-[#dadada] border-t-[#dadada] py-2 md:hidden"
                key={cartItem.id}
            >
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center max-[500px]:hidden">
                        <CartRemoveItemButton
                            iconSize={20}
                            itemId={cartItem.id}
                        />
                    </div>
                    {/* <Image
                        src={cartItem.Product.images[0]}
                        width={100}
                        height={100}
                        alt={cartItem.Product.model}
                        className="aspect-square h-auto w-auto border border-solid border-gray-300/40 mix-blend-darken"
                    /> */}
                    <Image
                        src={cartItem.Product.images[0]}
                        width={48}
                        height={48}
                        alt={cartItem.Product.model}
                        className="aspect-square h-auto w-auto border border-solid border-gray-300/40 mix-blend-darken"
                    />
                    <h2 className="line-clamp-4 text-xs font-medium text-gray-600 min-[500px]:text-sm">
                        {cartItem.Product.model}
                    </h2>
                </div>

                <div className="flex flex-col items-center justify-between space-y-1">
                    <div className="flex flex-col items-center justify-center text-center text-xs font-extrabold text-gray-700 min-[500px]:text-sm ">
                        {cartItem.Product.DealerPrice.find(
                            (dealerPrice) => dealerPrice.dealerId === dealer?.id
                        )?.price ? (
                            <span className="text-xs text-gray-400 line-through">
                                {formatPrice(
                                    cartItem.Product.price * cartItem.quantity
                                )}
                            </span>
                        ) : null}
                        {formatPrice(
                            (cartItem.Product.DealerPrice.find(
                                (dealerPrice) =>
                                    dealerPrice.dealerId === dealer?.id
                            )?.price || cartItem.Product.price) *
                                cartItem.quantity
                        )}
                    </div>

                    <QuantitySelect cartItem={cartItem} />
                    <div className="flex items-center justify-center min-[500px]:hidden">
                        <CartRemoveItemButton
                            iconSize={20}
                            itemId={cartItem.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
