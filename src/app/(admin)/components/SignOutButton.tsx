"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            className="btn btn-ghost w-full items-center justify-start rounded-lg px-3 text-white hover:bg-gray-200/5 "
            onClick={() =>
                signOut({
                    callbackUrl: DEFAULT_LOGIN_REDIRECT,
                    redirect: true,
                })
            }
        >
            <ArrowRightStartOnRectangleIcon width={28} height={28} />
            <span className="ml-0.5">Çıkış Yap</span>
        </button>
    );
}
