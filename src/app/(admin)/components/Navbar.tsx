"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-row items-center justify-between rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h1 className="font-semibold text-gray-400">
                {pathname
                    .split("/")
                    .pop()
                    .replace(/-/g, " ")
                    .split(" ")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
            </h1>
        </div>
    );
}
