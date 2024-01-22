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
import { Button } from "@/components/ui/button";
import { deleteAddressById, undoDeleteAddress } from "@/lib/db/address";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteAddressButton({
    addressId,
}: {
    addressId: string;
}) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const { success, error, address } = await deleteAddressById({
                addressId,
            });
            toast[success ? "success" : "error"](success || error, {
                action: {
                    label: "Geri Al",
                    async onClick() {
                        const undo = await undoDeleteAddress({
                            address,
                        });
                        toast[undo.success ? "success" : "error"](
                            undo.success || undo.error,
                            {
                                position: "top-right",
                                style: {
                                    height: "fit-content",
                                },
                                duration: 5000,
                            }
                        );
                    },
                },
                position: "top-right",
                style: {
                    height: "fit-content",
                },
                duration: 10000,
            });
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className={`${isPending && "pointer-events-none opacity-50"}`}
                asChild
            >
                <Button variant="destructive" size="sm" className="w-full">
                    Sil
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className=" text-white/80">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Adresi silmek istediğinize emin misiniz?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        İptal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="w-16"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        Sil
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
