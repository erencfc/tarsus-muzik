"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
    return (
        <div className="mt-4 w-3/12">
            <Button
                variant="outline"
                onClick={() => {
                    window.history.back();
                }}
                className="space-x-2"
            >
                <ArrowLeftIcon
                    width={16}
                    height={16}
                    className="text-white opacity-70"
                />
                <span className="text-xs text-gray-200">
                    ALIŞVERİŞE DEVAM ET
                </span>
            </Button>
        </div>
    );
}
