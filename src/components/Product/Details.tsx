"use client";

import { useSession } from "next-auth/react";
import { incrementProductQuantity } from "@/app/(product)/urun/[slug]/actions";
import { formatPrice } from "@/lib/format";
import {
    BellAlertIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    CreditCardIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import type { Product, Brand, SubCategory, Category } from "@prisma/client";
import { useState, useTransition } from "react";
import ToggleFavoriteButton from "../ToggleFavoriteButton";
import CreateCommentModal from "./CreateCommentModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetails({
    product,
    isFavorite,
}: {
    product: Product & {
        Brand: Brand;
        Category: Category;
        SubCategory: SubCategory;
    };
    isFavorite: boolean;
}) {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user as any;

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [minQuantity, maxQuantity] = [1, 99];

    const increaseQuantity = () => {
        if (quantity < maxQuantity) setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > minQuantity) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        setSuccess(false);
        startTransition(async () => {
            await incrementProductQuantity(product.id, quantity);
            setSuccess(true);
        });
    };

    if (!isPending && success) {
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    }

    return (
        <>
            {user && (
                <CreateCommentModal productId={product.id} userId={user?.id} />
            )}
            <div className="flex w-full flex-col">
                <Link
                    href={`/marka/${product.Brand.slug}`}
                    className="text-sm font-extrabold uppercase text-gray-900/40 transition-colors duration-200 hover:text-gray-900/80"
                >
                    {product.Brand.name}
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">
                    {product.model}
                </h1>
                <div className="mt-4 flex flex-col gap-2 text-xs font-semibold text-gray-900/60">
                    <div className="flex flex-row">
                        <span className="w-20">Stok Kodu</span>
                        <span className="uppercase before:mr-2 before:content-[':']">
                            {product.id.slice(-10)}
                        </span>
                    </div>
                    <div className="flex flex-row">
                        <span className="w-20">Kategori</span>
                        <Link
                            href={`/kategori/${product.Category.slug}/${product.SubCategory.slug}`}
                            className="transition-colors duration-200 before:mr-2 before:content-[':'] hover:text-primary"
                        >
                            {product.SubCategory.name}
                        </Link>
                    </div>
                </div>
                <span className="mt-12 text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                    {quantity > 1 && (
                        <span className="ml-2 text-sm font-semibold text-gray-900/60">
                            (
                            {formatPrice(
                                Math.round(product.price * quantity * 100) / 100
                            )}
                            )
                        </span>
                    )}
                </span>

                <span className="ml-auto text-xs font-bold text-gray-900/80">
                    KARGO:{" "}
                    <span className="font-semibold text-gray-900/60">
                        {product.deliveryTimeMinDay} -{" "}
                        {product.deliveryTimeMaxDay} İŞ GÜNÜ
                    </span>
                </span>

                <div className="mt-4 flex flex-row gap-6">
                    <div className="flex cursor-pointer flex-row items-center justify-center gap-2 transition-colors duration-150 hover:text-primary">
                        <CreditCardIcon
                            width={22}
                            height={22}
                            className="opacity-70"
                        />
                        <span className="text-xs text-opacity-70">
                            Taksit Seçenekleri
                        </span>
                    </div>
                    <div className="flex cursor-pointer flex-row items-center justify-center gap-2 transition-colors duration-150 hover:text-primary">
                        <BellAlertIcon
                            width={22}
                            height={22}
                            className="opacity-70"
                        />
                        <span className="text-xs text-opacity-70">
                            İndirime Girerse Bildir
                        </span>
                    </div>
                    <div className="flex cursor-pointer flex-row items-center justify-center gap-2 transition-colors duration-150 hover:text-primary">
                        <ToggleFavoriteButton
                            user={user}
                            productId={product.id}
                        >
                            <div className="flex flex-row items-center gap-2">
                                {!isFavorite ? (
                                    <>
                                        <HeartIcon
                                            width={22}
                                            height={22}
                                            className="opacity-70"
                                        />
                                        <span className="text-xs text-opacity-70">
                                            Favorilerime Ekle
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
                                        </svg>
                                        <span className="text-xs text-opacity-70">
                                            Favorilerimden Çıkar
                                        </span>
                                    </>
                                )}
                            </div>
                        </ToggleFavoriteButton>
                    </div>
                    <button
                        onClick={() => {
                            if (!user) {
                                router.push("/login");
                                return;
                            }

                            (
                                document.getElementById(
                                    "create_comment_modal"
                                ) as HTMLDialogElement
                            )?.showModal();
                        }}
                        className="text-xs text-opacity-70"
                    >
                        <div className="flex cursor-pointer flex-row items-center justify-center gap-2 transition-colors duration-150 hover:text-primary">
                            <ChatBubbleOvalLeftEllipsisIcon
                                width={22}
                                height={22}
                                className="opacity-70"
                            />
                            Yorum Yap
                        </div>
                    </button>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-row items-center">
                        <div className="flex flex-row items-center gap-2">
                            <button
                                className={`${
                                    isPending ||
                                    quantity === minQuantity ||
                                    (!isPending && success)
                                        ? "btn-disabled"
                                        : ""
                                }`}
                                onClick={decreaseQuantity}
                            >
                                <MinusIcon
                                    className={`${
                                        isPending ||
                                        quantity === minQuantity ||
                                        (!isPending && success)
                                            ? "text-gray-800/40"
                                            : ""
                                    }`}
                                    width={24}
                                    height={24}
                                />
                            </button>

                            <input
                                type="text"
                                value={quantity}
                                maxLength={2}
                                min={1}
                                max={99}
                                className={`input input-bordered input-md w-1/3 text-center focus:outline-none ${
                                    !isPending && success && quantity > 9
                                        ? "w-[45%]"
                                        : !isPending && success
                                          ? "w-[40%]"
                                          : ""
                                }`}
                                readOnly
                            />
                            <button
                                onClick={increaseQuantity}
                                className={`${
                                    isPending ||
                                    quantity === maxQuantity ||
                                    (!isPending && success)
                                        ? "btn-disabled"
                                        : ""
                                }`}
                            >
                                <PlusIcon
                                    width={24}
                                    height={24}
                                    className={`${
                                        isPending ||
                                        quantity === maxQuantity ||
                                        (!isPending && success)
                                            ? "text-gray-800/40"
                                            : ""
                                    }`}
                                />
                            </button>
                        </div>
                        <button
                            className={`h-full w-full rounded-md bg-primary py-2 text-sm font-semibold text-white ${
                                isPending || (!isPending && success)
                                    ? "btn-disabled bg-opacity-40"
                                    : ""
                            } ${!isPending && success ? "ml-2" : ""}`}
                            onClick={handleAddToCart}
                        >
                            Sepete Ekle{" "}
                            {quantity > 1 && (
                                <span className="font-bold">({quantity})</span>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 text-center text-xs font-semibold text-gray-900/60">
                        {isPending && (
                            <div className="my-2 flex justify-center">
                                <span className="loading loading-ball loading-lg"></span>
                            </div>
                        )}
                        {!isPending && success && (
                            <span className="my-2 flex w-full items-center justify-center text-center text-2xl font-bold text-green-500">
                                {quantity > 1 ? `${quantity} ` : ""}Ürün Sepete
                                Eklendi!
                            </span>
                        )}
                        <span>
                            3D Secure güvenli ödeme yöntemi ile kredi kartınızla
                            ödeme yapabilirsiniz.
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 text-center text-xs font-semibold text-gray-900/60">
                        <span>
                            <span className="font-bold">
                                Taksit Seçenekleri
                            </span>{" "}
                            için tıklayın.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
