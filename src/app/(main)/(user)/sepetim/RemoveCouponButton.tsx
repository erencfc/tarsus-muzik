"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";

type RemoveCouponButtonProps = {
    couponId: string;
    removeCoupon: (couponId: string) => Promise<void>;
};

export default function RemoveCouponButton({
    couponId,
    removeCoupon,
}: RemoveCouponButtonProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await removeCoupon(couponId);
                });
            }}
        >
            <XMarkIcon
                width={16}
                height={16}
                className={`text-black transition-colors duration-200 ${
                    isPending ? "opacity-30" : "hover:text-red-500"
                }`}
            />
        </button>
    );
}
