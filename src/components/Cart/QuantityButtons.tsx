"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";

export default function QuantityButtons({ item }: { item: any }) {
    const quantityOptions: JSX.Element[] = [];

    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }

    return (
        <div className="ml-8 flex flex-col">
            <select
                className="select select-bordered w-full max-w-[80px] focus:border-primary focus:outline-none"
                defaultValue={item.Product.quantity}
            >
                {quantityOptions}
            </select>
        </div>
    );
    //     const [isPending, startTransition] = useTransition();
    //     const [success, setSuccess] = useState(false);
    //     const [quantity, setQuantity] = useState(1);
    //     const [minQuantity, maxQuantity] = [1, 99];

    //     const increaseQuantity = () => {
    //         if (quantity < maxQuantity) setQuantity((prev) => prev + 1);
    //     };

    //     const decreaseQuantity = () => {
    //         if (quantity > minQuantity) {
    //             setQuantity((prev) => prev - 1);
    //         }
    //     };

    //     return (
    //         <div className="flex flex-row">
    //             <div className="flex flex-row items-center gap-2">
    //                 <button
    //                     className={`${
    //                         isPending ||
    //                         quantity === minQuantity ||
    //                         (!isPending && success)
    //                             ? "btn-disabled"
    //                             : ""
    //                     }`}
    //                     onClick={decreaseQuantity}
    //                 >
    //                     <MinusIcon
    //                         className={`${
    //                             isPending ||
    //                             quantity === minQuantity ||
    //                             (!isPending && success)
    //                                 ? "text-gray-800/40"
    //                                 : ""
    //                         }`}
    //                         width={24}
    //                         height={24}
    //                     />
    //                 </button>

    //                 <input
    //                     type="text"
    //                     value={quantity}
    //                     maxLength={2}
    //                     min={1}
    //                     max={99}
    //                     className={`input input-bordered input-md w-1/3 text-center focus:outline-none ${
    //                         !isPending && success && quantity > 9
    //                             ? "w-[45%]"
    //                             : !isPending && success
    //                               ? "w-[40%]"
    //                               : ""
    //                     }`}
    //                     readOnly
    //                 />
    //                 <button
    //                     onClick={increaseQuantity}
    //                     className={`${
    //                         isPending ||
    //                         quantity === maxQuantity ||
    //                         (!isPending && success)
    //                             ? "btn-disabled"
    //                             : ""
    //                     }`}
    //                 >
    //                     <PlusIcon
    //                         width={24}
    //                         height={24}
    //                         className={`${
    //                             isPending ||
    //                             quantity === maxQuantity ||
    //                             (!isPending && success)
    //                                 ? "text-gray-800/40"
    //                                 : ""
    //                         }`}
    //                     />
    //                 </button>
    //             </div>
    //         </div>
    //     );
}
