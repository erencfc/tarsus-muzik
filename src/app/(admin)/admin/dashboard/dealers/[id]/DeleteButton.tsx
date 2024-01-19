"use client";

import { toast } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteDealerPrice } from "@/lib/db/dealer";

export default function DeleteButton({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);
    const handleClick = async () => {
        if (
            confirm(
                "Bu ürün için bayi indirimini kaldırmak istediğinize emin misiniz?"
            )
        ) {
            setIsPending(true);
            const response = await deleteDealerPrice({ id });

            if (response.success) {
                toast(response.success, {
                    icon: (
                        <i>
                            <CheckBadgeIcon
                                width={24}
                                height={24}
                                className="text-green-500"
                            />
                        </i>
                    ),
                });
            } else if (response.error) {
                toast(response.error, {
                    icon: (
                        <i>
                            <ExclamationTriangleIcon
                                width={24}
                                height={24}
                                className="text-red-500"
                            />
                        </i>
                    ),
                });
            }

            setIsPending(false);
        } else {
            toast("İşlem iptal edildi.");
        }
    };

    return (
        <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleClick}
        >
            {isPending ? (
                <span className="loading loading-spinner loading-xs text-white" />
            ) : (
                <span>Sil</span>
            )}
        </Button>
    );
}
