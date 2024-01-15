"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteAddress } from "./action";
import { toast } from "react-toastify";

export default function DeleteAddressButton({
    addressId,
}: {
    addressId: string;
}) {
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    return (
        <div className="h-8 w-full">
            {!confirm ? (
                <button
                    className="btn-danger btn btn-sm btn-block"
                    onClick={() => {
                        if (!confirm) {
                            setConfirm(true);
                            return;
                        }
                    }}
                >
                    Sil
                </button>
            ) : (
                <div className="mt-2 flex flex-row items-center justify-center gap-2">
                    <button
                        className={`text-green-500 ${
                            isPending ? "opacity-40" : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();

                            if (isPending) return;

                            startTransition(async () => {
                                const deleted = await deleteAddress({
                                    addressId,
                                });
                                toast[deleted.success ? "success" : "error"](
                                    deleted.message
                                );
                                // router.refresh();
                            });
                        }}
                    >
                        <CheckIcon width={20} height={20} />
                    </button>
                    <button
                        className={`text-red-500 ${
                            isPending ? "opacity-40" : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (isPending) return;
                            setConfirm(false);
                        }}
                    >
                        <XMarkIcon width={20} height={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
