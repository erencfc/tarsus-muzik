"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <>
            <input
                type="text"
                placeholder="Ara..."
                className="input input-bordered input-secondary h-8 w-full max-w-full rounded-full border border-gray-300 text-sm placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        window.location.href = `/ara?q=${searchQuery}`;
                    }
                }}
            />
            <a
                href={`/ara?q=${searchQuery}`}
                className="absolute right-2 top-1 scale-[.8] transition duration-200 ease-in-out hover:scale-100"
            >
                <MagnifyingGlassIcon width={24} height={24} />
            </a>
        </>
    );
}
