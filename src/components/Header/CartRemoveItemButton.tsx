"use client";

import { removeItemFromCart } from "@/lib/db/item";
import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CartRemoveItemButton({
    itemId,
    direction = "col",
}: {
    itemId: string;
    direction?: "col" | "row";
}) {
    const [confirms, setConfirms] = useState<string[]>([]);
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    return (
        <button
            className="transition-colors duration-150 hover:text-primary"
            onClick={() => {
                if (!confirms.includes(itemId)) {
                    setConfirms((prev) => [...prev, itemId]);
                }
            }}
        >
            {!confirms.includes(itemId) ? (
                <TrashIcon width={20} height={20} />
            ) : (
                <div className={`flex gap-2 flex-${direction}`}>
                    <span
                        className={`text-green-500 ${
                            isPending ? "opacity-40" : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();

                            if (isPending) return;

                            startTransition(async () => {
                                await removeItemFromCart(itemId);

                                router.refresh();
                            });
                        }}
                    >
                        <CheckIcon width={20} height={20} />
                    </span>
                    <span
                        className={`text-red-500 ${
                            isPending ? "opacity-40" : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (isPending) return;
                            setConfirms((prev) =>
                                prev.filter((id) => id !== itemId)
                            );
                        }}
                    >
                        <XMarkIcon width={20} height={20} />
                    </span>
                </div>
            )}
        </button>
    );
}
