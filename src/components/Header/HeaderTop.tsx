"use server";

import Image from "next/image";
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "../SignOutButton";
import ShoppingCartButton from "./ShoppingCartButton";
import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { getCart } from "@/lib/db/cart";

export default async function HeaderTop() {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;

    const cart = await getCart();

    return (
        <div className="flex items-center justify-between px-6 pb-5 pt-6">
            <div className="pb-3 ">
                <Link href="/">
                    <Image
                        src="/desktop.png"
                        alt="logo"
                        className="h-[52px] w-[180px]"
                        width={179}
                        height={36}
                        priority
                    />
                </Link>
            </div>
            {/* SEARCH INPUT START */}
            <div className="inline-block w-2/4 px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0">
                <div className="relative flex">
                    <input
                        type="text"
                        placeholder="Ara..."
                        className="input input-bordered input-secondary h-8 w-full max-w-full rounded-full border border-gray-300 text-sm placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="absolute right-2 top-1 scale-[.8] transition duration-200 ease-in-out hover:scale-100">
                        <MagnifyingGlassIcon width={24} height={24} />
                    </button>
                </div>
            </div>
            {/* SEARCH INPUT END */}

            <div className="flex items-center gap-4 text-sm">
                <Link
                    href="/hesabim"
                    className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 transition duration-300 ease-in-out hover:translate-y-1 hover:cursor-pointer hover:border-gray-600 hover:text-primary hover:shadow-lg"
                >
                    <div className="flex w-full flex-row-reverse items-center gap-2  md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                        <UserIcon width={28} height={28} />
                        <div className="hidden md:inline-block lg:inline-block xl:inline-block 2xl:inline-block">
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
