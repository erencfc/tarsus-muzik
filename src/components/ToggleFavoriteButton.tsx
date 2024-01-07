"use client";

import { ToggleFavorite } from "@/lib/db/user";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ToggleFavoriteButton({
    user,
    productId,
    children,
}: {
    user: any;
    productId: string;
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

                if (!user) {
                    router.push("/login");
                    return;
                }

                startTransition(async () => {
                    const favorite = await ToggleFavorite(user.id, productId);
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
