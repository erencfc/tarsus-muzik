"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { removeItemFromCart } from "@/lib/db/item";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";
import { toast } from "sonner";

export default function CartRemoveItemButton({
    itemId,
    iconSize,
}: {
    itemId: string;
    iconSize: number;
}) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            await removeItemFromCart(itemId);
            toast("Ürün sepetten kaldırıldı.", {
                position: "top-right",
                style: {
                    height: "fit-content",
                },
                duration: 2000,
                icon: (
                    <i>
                        <TrashIcon
                            width={24}
                            height={24}
                            className="text-red-500"
                        />
                    </i>
                ),
            });
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className={`${
                    isPending ? "pointer-events-none opacity-50" : null
                }`}
                asChild
            >
                <TrashIcon
                    className="cursor-pointer transition-colors duration-200 hover:text-primary"
                    width={iconSize}
                    height={iconSize}
                />
            </AlertDialogTrigger>
            <AlertDialogContent className=" text-white/80">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Ürünü sepetten kaldırmak istediğinize emin misiniz?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        İptal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="w-full sm:w-fit"
                        onClick={handleClick}
                        disabled={isPending}
                    >
                        Sil
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
