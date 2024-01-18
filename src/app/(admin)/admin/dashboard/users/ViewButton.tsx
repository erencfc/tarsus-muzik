"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { Suspense } from "react";
import ViewDetails from "./ViewDetails";
import { useRouter } from "next/navigation";

type ViewButtonProps = {
    children: React.ReactNode;
    id: string;
    mode?: "modal" | "redirect";
    asChild?: boolean;
};

export default function ViewButton({
    children,
    id,
    mode = "redirect",
    asChild,
}: ViewButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/admin/dashboard/users/${id}`);
    };

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <Suspense>
                        {/* //! TODO: add loading skeleton for suspense callback  */}
                        <ViewDetails id={id} />
                    </Suspense>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Kapat
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <span onClick={handleClick} className="cursor-pointer">
            {children}
        </span>
    );
}
