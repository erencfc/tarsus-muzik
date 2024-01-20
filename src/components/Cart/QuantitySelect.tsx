"use client";

import { setProductQuantity } from "@/app/(main)/(user)/sepetim/cart";
import { CartItemWithProduct } from "@/lib/db/cart";
import { useTransition } from "react";

export default function QuantitySelect({
    cartItem,
}: {
    cartItem: CartItemWithProduct;
}) {
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
        <>
            {isPending ? (
                <span className="loading loading-spinner text-accent" />
            ) : (
                <select
                    className="select select-bordered w-full max-w-[80px] focus:border-primary focus:outline-none"
                    defaultValue={cartItem.quantity}
                    onChange={(e) => {
                        const newQuantity = parseInt(e.currentTarget.value);
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
        </>
    );
}
