"use client";

import { incrementProductQuantity } from "@/app/(main)/(product)/urun/[slug]/actions";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { useTransition } from "react";
import { ExternalToast, toast } from "sonner";

export default function AddToCartButton({
    product,
}: {
    product: Prisma.ProductGetPayload<{
        select: {
            id: true;
            model: true;
            modelSlug: true;
            images: true;
            price: true;
            DealerPrice: {
                select: {
                    Dealer: {
                        select: {
                            userId: true;
                        };
                    };
                    productId: true;
                    price: true;
                };
            };
        };
    }>;
}) {
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = () => {
        startTransition(() => {
            const toastData: ExternalToast = {
                position: "top-right",
                style: {
                    height: "fit-content",
                },
                duration: 5000,
            };
            try {
                incrementProductQuantity(product.id).then(() => {
                    toast.success("Ürün sepete eklendi. ", toastData);
                });
            } catch (error) {
                toast.error(
                    "Bir hata oluştu. Lütfen tekrar deneyin.",
                    toastData
                );
            }
        });
    };

    return (
        <Button
            variant="outline"
            className="dark:text-gray-200"
            onClick={handleAddToCart}
            disabled={isPending}
        >
            Sepete Ekle
        </Button>
    );
}
