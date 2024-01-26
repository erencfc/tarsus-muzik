"use client";

import { setProductQuantity } from "@/app/(main)/(user)/sepetim/cart";
import { CartItemWithProduct } from "@/lib/db/cart";
import { useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function QuantitySelect({
    cartItem,
}: {
    cartItem: CartItemWithProduct;
}) {
    const [isPending, startTransition] = useTransition();

    const quantityOptions: JSX.Element[] = [];

    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <SelectItem value={i.toString()} key={i}>
                {i}
            </SelectItem>
        );
    }

    return (
        <>
            {isPending ? (
                <span className="loading loading-spinner text-accent" />
            ) : (
                <Select
                    onValueChange={(selected) => {
                        const newQuantity = parseInt(selected);
                        startTransition(async () => {
                            await setProductQuantity(
                                cartItem.productId,
                                newQuantity
                            );
                        });
                    }}
                    value={cartItem.quantity.toString()}
                >
                    <SelectTrigger className="w-[60px] bg-base-100 dark:bg-base-100">
                        <SelectValue className="text-gray-300 dark:text-gray-300">
                            {cartItem.quantity}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="text-gray-300 dark:text-gray-300">
                            {quantityOptions}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </>
    );
}
