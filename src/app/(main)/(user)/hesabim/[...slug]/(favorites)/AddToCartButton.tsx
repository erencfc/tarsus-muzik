"use client";

import { incrementProductQuantity } from "@/app/(main)/(product)/urun/[slug]/actions";
import { Prisma } from "@prisma/client";
import { useState, useTransition } from "react";

export default function AddToCartButton({
    product,
}: {
    product: Prisma.ProductGetPayload<{}>;
}) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [pendingProduct, setPendingProduct] = useState("");
    const [addedProducts, setAddedProducts] = useState<string[]>([]);

    const handleAddToCart = () => {
        setPendingProduct(product.id);
        setSuccess(false);
        startTransition(async () => {
            await incrementProductQuantity(product.id);
            setSuccess(true);
            setAddedProducts((prev) => [...prev, product.id]);
            setTimeout(() => {
                setSuccess(false);
                setPendingProduct("");
                setAddedProducts([]);
            }, 3000);
        });
    };

    return (
        <button
            className="btn btn-primary btn-md rounded-md text-white"
            onClick={handleAddToCart}
            disabled={isPending && pendingProduct === product.id}
        >
            <div className="flex w-24 items-center justify-center ">
                {isPending && pendingProduct === product.id ? (
                    <span className="loading loading-spinner loading-sm text-primary" />
                ) : success && addedProducts.includes(product.id) ? (
                    <span className="text-green-500">Sepete Eklendi!</span>
                ) : (
                    <span>Sepete Ekle</span>
                )}
            </div>
        </button>
    );
}
