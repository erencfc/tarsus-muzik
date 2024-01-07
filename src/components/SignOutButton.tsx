"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 transition duration-300 ease-in-out hover:translate-y-1 hover:cursor-pointer hover:border-gray-600 hover:text-primary hover:shadow-lg"
            onClick={() => signOut()}
        >
            <div className="flex w-full flex-row-reverse items-center gap-2  md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                <ArrowRightStartOnRectangleIcon width={28} height={28} />
                <span className="font-medium">Çıkış Yap</span>
            </div>
        </button>
    );
}
