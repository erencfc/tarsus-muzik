"use client";

import { TCategory } from "@/types/TCategory";
import {
    Bars3Icon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    UserIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import ShoppingCartButton from "./ShoppingCartButton";
import { ShoppingCart } from "@/lib/db/cart";
import Link from "next/link";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { User } from "next-auth";

export default function HamburgerMenu({
    categories,
    cart,
    user,
}: {
    categories: TCategory[];
    cart: ShoppingCart | null;
    user: User | null;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-[1111] m-auto flex h-20 w-full min-w-[290px] items-center justify-between bg-black px-4 text-white xl:hidden">
            {/* Hamburger Menu */}
            <div className="flex flex-col">
                {/* Menu Toggle Button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <>
                        {isMenuOpen && <XMarkIcon width={32} height={32} />}
                        {!isMenuOpen && <Bars3Icon width={32} height={32} />}
                    </>
                </button>

                {/* Menu */}
                <div
                    className={`${
                        isMenuOpen ? "flex" : "hidden"
                    } absolute left-0 top-20 max-h-screen w-full flex-col overflow-y-auto bg-black`}
                >
                    <Link
                        href="/hesabim"
                        className="flex flex-row items-center gap-2 border-b border-b-zinc-800 p-4"
                    >
                        <UserIcon width={28} height={28} />
                        <span className="inline-block">
                            {user ? (
                                <p className="font-medium">Hesabım</p>
                            ) : (
                                <p className="font-medium">
                                    Giriş Yap <br /> veya Üye Ol
                                </p>
                            )}
                        </span>
                    </Link>
                    <Accordion type="single" collapsible className="w-full">
                        {categories.map((category) => (
                            <AccordionItem
                                key={category.id}
                                value={category.id}
                                className="px-4"
                            >
                                <AccordionTrigger>
                                    {category.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul>
                                        <li
                                            key={category.id + 11}
                                            className="relative flex w-full flex-col justify-end rounded-lg py-1.5 text-sm font-bold after:absolute after:top-0 after:h-[1px] after:w-full after:bg-zinc-800 after:p-0 after:content-['']"
                                        >
                                            <Link
                                                className="px-4 py-1 font-bold"
                                                href={`/kategori/${category.slug}`}
                                                key={category.id + 11}
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                {category.name} Kategorisi Ana
                                                Sayfa
                                            </Link>
                                        </li>
                                        {category.SubCategory.map(
                                            (subCategory) => (
                                                <li
                                                    key={subCategory.id}
                                                    className=" relative flex w-full flex-col justify-end rounded-lg py-1.5 text-sm after:absolute after:top-0 after:h-[1px] after:w-full after:bg-zinc-800 after:p-0 after:content-['']"
                                                >
                                                    <Link
                                                        className="px-8 py-1 font-bold"
                                                        href={`/kategori/${category.slug}/${subCategory.slug}`}
                                                        key={subCategory.id}
                                                        onClick={() =>
                                                            setIsMenuOpen(false)
                                                        }
                                                    >
                                                        <div className="flex flex-row items-center gap-2">
                                                            <ChevronRightIcon
                                                                width={20}
                                                                height={20}
                                                            />
                                                            {subCategory.name}
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            {/* Logo */}
            <Link href="/">
                <Image
                    src="/images/mobile.png"
                    alt="logo"
                    width={190}
                    height={30}
                    className="h-auto"
                />
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-2">
                <Link href="/ara">
                    <MagnifyingGlassIcon width={24} height={24} />
                </Link>
                <ShoppingCartButton cart={cart} width={24} height={24} />
            </div>
        </div>
    );
}
