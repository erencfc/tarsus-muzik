"use client";

import { ToggleFavorite } from "@/lib/db/user";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Product } from "@prisma/client";
import { DEFAULT_LOGIN_PATH } from "@/routes";

export default function ToggleFavoriteButton({
    user,
    product,
    children,
}: {
    user: any;
    product: Product;
    children?: React.ReactNode;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <button
            disabled={isPending}
            className={`transition-colors duration-200 ease-out ${
                isPending ? "opacity-40" : "hover:text-accent"
            }`}
            onClick={(e) => {
                e.preventDefault();
                const callback = encodeURIComponent(
                    `/urun/${product.modelSlug}`
                );
                if (!user) {
                    router.push(`${DEFAULT_LOGIN_PATH}?callback=${callback}`);
                    return;
                }

                startTransition(async () => {
                    const favorite = await ToggleFavorite(user.id, product.id);
                    router.refresh();
                    toast[favorite.success ? "success" : "error"](
                        favorite.message
                    );
                });
            }}
        >
            {children}
        </button>
    );
}
