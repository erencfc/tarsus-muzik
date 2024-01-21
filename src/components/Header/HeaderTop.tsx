"use server";

import Image from "next/image";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import SignOutButton from "../SignOutButton";
import ShoppingCartButton from "./ShoppingCartButton";
import Link from "next/link";
import { Suspense } from "react";

import { getCart } from "@/lib/db/cart";

import SearchInput from "./SearchInput";
import { currentUser } from "@/lib/auth";

export default async function HeaderTop() {
    const user = await currentUser();

    const cart = await getCart();

    return (
        <div className="flex items-center justify-between p-6 py-3">
            <div className="pb-3">
                <Link href="/">
                    <Image
                        src="/desktoptest.png"
                        alt="logo"
                        className=""
                        width={179}
                        height={52}
                        priority
                    />
                </Link>
            </div>
            {/* SEARCH INPUT START */}
            <div className="inline-block w-2/4 px-4 md:px-0">
                <div className="relative flex">
                    <SearchInput />
                </div>
            </div>
            {/* SEARCH INPUT END */}

            <div className="flex items-center gap-4 text-sm">
                <Link
                    href="/hesabim"
                    className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 transition duration-300 ease-in-out hover:translate-y-1 hover:cursor-pointer hover:border-gray-600 hover:text-primary hover:shadow-lg"
                >
                    <div className="flex w-full flex-row items-center gap-2">
                        <UserIcon width={28} height={28} />
                        <div className="inline-block">
                            {user ? (
                                <span className="font-medium">Hesabım</span>
                            ) : (
                                <span className="font-medium">
                                    Giriş Yap <br /> veya Üye Ol
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
                {user && <SignOutButton />}
                <Suspense
                    fallback={
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-sm pointer-events-none cursor-not-allowed border border-transparent transition duration-300 ease-in-out hover:translate-y-1 hover:cursor-pointer hover:border-gray-600 hover:bg-transparent hover:text-primary"
                        >
                            <div className="relative">
                                <ShoppingCartIcon width={28} height={28} />
                                <span className="absolute bottom-4 left-5 rounded-full bg-primary px-1 py-0.5 text-sm font-semibold leading-none text-white">
                                    0
                                </span>
                            </div>
                        </label>
                    }
                >
                    <ShoppingCartButton cart={cart} width={28} height={28} />
                </Suspense>
            </div>
        </div>
    );
}
