"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
import CartRemoveItemButton from "../Header/CartRemoveItemButton";
import { useTransition } from "react";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

type CartEntryProps = {
    cartItem: CartItemWithProduct;
    setProductQuantity: (productId: string, quantity: number) => Promise<void>;
};

export default function CartEntry({
    cartItem,
    setProductQuantity,
}: CartEntryProps) {
    const [isPending, startTransition] = useTransition();

    const quantityOptions: JSX.Element[] = [];

    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }

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
                    <CartRemoveItemButton
                        itemId={cartItem.id}
                        direction="row"
                    />
                </div>
                <div className="flex items-center text-sm font-extrabold text-gray-700">
                    {formatPrice(cartItem.Product.price)}
                </div>
                <div className="flex w-[80px] flex-col items-center justify-center">
                    {isPending ? (
                        <span className="loading loading-spinner text-accent" />
                    ) : (
                        <select
                            className="select select-bordered w-full max-w-[80px] focus:border-primary focus:outline-none"
                            defaultValue={cartItem.quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(
                                    e.currentTarget.value
                                );
                                startTransition(async () => {
                                    await setProductQuantity(
                                        cartItem.productId,
                                        newQuantity
                                    );
                                });
                            }}
                        >
                            {quantityOptions}
                        </select>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="text-sm font-extrabold text-gray-700">
                        {formatPrice(
                            cartItem.Product.price * cartItem.quantity
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
