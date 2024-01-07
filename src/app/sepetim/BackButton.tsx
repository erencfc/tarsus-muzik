"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
    return (
        <div className="mt-4 w-3/12">
            <button
                className="btn btn-sm btn-block rounded-sm"
                onClick={() => {
                    window.history.back();
                }}
            >
                <ArrowLeftIcon width={16} height={16} className="opacity-60" />
                <span className="text-xs text-gray-700/50">
                    ALIŞVERİŞE DEVAM ET
                </span>
            </button>
        </div>
    );
}
