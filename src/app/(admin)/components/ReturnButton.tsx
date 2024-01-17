"use client";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ReturnButton() {
    const router = useRouter();

    return (
        <button
            className="btn btn-ghost w-full items-center justify-start rounded-lg px-3 text-white hover:bg-gray-200/5 "
            onClick={() => router.push("/")}
        >
            <ArrowUturnLeftIcon width={28} height={28} />
            <span className="ml-0.5">Siteye Dön</span>
        </button>
    );
}
