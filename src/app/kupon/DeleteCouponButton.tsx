"use client";

import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";

type DeleteCouponButtonProps = {
    couponId: string;
    deleteCoupon: (couponId: string) => Promise<void>;
};

export default function DeleteCouponButton({
    couponId,
    deleteCoupon,
}: DeleteCouponButtonProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            onClick={() => {
                if (confirm("Bu kuponu silmek istediğinize emin misiniz?")) {
                    startTransition(async () => {
                        await deleteCoupon(couponId);
                    });
                }
            }}
        >
            <BackspaceIcon width={16} height={16} className="opacity-60" />
            <span className="text-sm text-gray-800/80">Sil</span>
        </button>
    );
}
