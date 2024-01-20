import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import QuantitySelect from "./QuantitySelect";
import { getDealerByUserId } from "@/lib/db/dealer";
import { currentUser } from "@/lib/auth";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import CartRemoveItemButton from "../Header/CartRemoveItemButton";
import { Dealer } from "@prisma/client";

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
        <div className="flex flex-col after:my-2 after:h-[1px] after:w-full after:bg-gray-400/30 after:content-['']">
            <div
                className="my-4 flex flex-row justify-between pr-2"
                key={cartItem.id}
            >
                <Link href={`/urun/${cartItem.Product.modelSlug}`}>
                    <Image
                        src={cartItem.Product.images[0]}
                        width={100}
                        height={100}
                        alt={cartItem.Product.model}
                        className="border border-solid border-gray-300/40 p-1 mix-blend-darken"
                    />
                </Link>
                <div className="flex flex-col items-start justify-between py-2">
                    <div className="w-80 text-xs font-semibold text-gray-600">
                        <Link href={`/urun/${cartItem.Product.modelSlug}`}>
                            {cartItem.Product.model}
                        </Link>
                    </div>

                    <CartRemoveItemButton iconSize={20} itemId={cartItem.id} />
                </div>
                <div className="flex min-w-[102px] flex-col items-center justify-center text-sm font-extrabold text-gray-700">
                    {cartItem.Product.DealerPrice.find(
                        (dealerPrice) => dealerPrice.dealerId === dealer?.id
                    )?.price && (
                        <span className="mr-1 text-xs text-gray-400 line-through">
                            {formatPrice(cartItem.Product.price)}
                        </span>
                    )}
                    <span>
                        {formatPrice(
                            cartItem.Product.DealerPrice.find(
                                (dealerPrice) =>
                                    dealerPrice.dealerId === dealer?.id
                            )?.price || cartItem.Product.price
                        )}
                    </span>
                </div>
                <div className="flex w-[80px] flex-col items-center justify-center">
                    <QuantitySelect cartItem={cartItem} />
                </div>

                <div className="flex min-w-[102px] flex-col items-center justify-center text-sm font-extrabold text-gray-700">
                    {cartItem.Product.DealerPrice.find(
                        (dealerPrice) => dealerPrice.dealerId === dealer?.id
                    )?.price && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(
                                cartItem.Product.price * cartItem.quantity
                            )}
                        </span>
                    )}
                    {formatPrice(
                        (cartItem.Product.DealerPrice.find(
                            (dealerPrice) => dealerPrice.dealerId === dealer?.id
                        )?.price || cartItem.Product.price) * cartItem.quantity
                    )}
                </div>
            </div>
        </div>
    );
}
