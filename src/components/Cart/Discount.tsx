"use client";

import { applyCoupon } from "@/app/(main)/(user)/sepetim/action";
import { getErrorMessage } from "@/lib/utils";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function Discount() {
    const [coupon, setCoupon] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{
        message: string;
        success: boolean;
    } | null>(null);

    const handleApplyCoupon = () => {
        startTransition(async () => {
            try {
                const response = await applyCoupon(coupon);

                setMessage(response);

                toast[response.success ? "success" : "error"](response.message);

                setCoupon("");
            } catch (error) {
                console.log(error);

                toast.error(getErrorMessage(error));
            }
        });
    };

    return (
        <div className="flex w-full flex-col">
            <h1 className="flex w-full flex-col text-lg font-semibold uppercase text-gray-900 after:my-2 after:h-[1px] after:w-full after:bg-[#dadada] after:content-['']">
                İNDİRİM KUPONU
            </h1>

            <div className="mt-2 flex flex-col gap-4">
                <input
                    className="input input-bordered input-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Kupon kodu"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                    className="btn btn-primary btn-sm rounded-sm text-white"
                    disabled={coupon.length < 1}
                    onClick={handleApplyCoupon}
                    tabIndex={0}
                >
                    {isPending ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <span>Kullan</span>
                    )}
                </button>
                {!isPending && message && (
                    <span
                        className={`text-center text-sm ${
                            message.success ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message.message}
                    </span>
                )}
            </div>
        </div>
    );
}
