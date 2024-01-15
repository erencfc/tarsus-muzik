"use client";

import { BellAlertIcon } from "@heroicons/react/24/outline";
import { toggleDiscountAlert } from "./action";
import { Product } from "@prisma/client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ToggleDiscountAlert({
    product,
    user,
}: {
    product: Product;
    user: any;
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <button
            className="flex flex-row items-center justify-center gap-2"
            disabled={isPending}
            onClick={(e) => {
                e.preventDefault();

                if (!user) {
                    router.push("/login");
                    return;
                }

                startTransition(async () => {
                    const discountAlert = await toggleDiscountAlert({
                        product,
                        userId: user.id,
                    });

                    toast[discountAlert.success ? "success" : "error"](
                        discountAlert.message
                    );
                });
            }}
        >
            <BellAlertIcon width={22} height={22} className="opacity-70" />
            <span className="text-xs text-opacity-70">
                İndirime Girerse Bildir
            </span>
        </button>
    );
}
