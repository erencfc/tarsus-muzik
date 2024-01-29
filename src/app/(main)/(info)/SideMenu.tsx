"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const listItems = [
    {
        title: "Hakkımızda",
        href: "/hakkimizda",
    },
    {
        title: "Satış Sözleşmesi",
        href: "/satis-sozlesmesi",
    },
    {
        title: "Üyelik Sözleşmesi",
        href: "/uyelik-sozlesmesi",
    },
    {
        title: "Kişisel Verilerin Korunması",
        href: "#",
    },
    {
        title: "Gizlilik Politikası",
        href: "/gizlilik-politikasi",
    },
    {
        title: "Çerez Politikası",
        href: "#",
    },
    {
        title: "Aydınlatma Metni",
        href: "#",
    },
    {
        title: "Ürün İade Koşulları",
        href: "/urun-iade-kosullari",
    },
    {
        title: "Garanti Koşulları",
        href: "#",
    },
    {
        title: "İletişim",
        href: "#",
    },
];

export default function SideMenu() {
    const pathname = usePathname();

    return (
        <ul className="text-sm font-medium">
            {listItems.map((item) => (
                <li key={item.href} className="my-3">
                    <Link
                        href={item.href}
                        className={`${
                            pathname === `${item.href}`
                                ? "font-bold text-primary"
                                : null
                        } group`}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <ChevronRightIcon
                                className={`h-4 w-4 text-gray-500 transition-all duration-300  ease-out group-hover:text-primary ${
                                    pathname === `${item.href}`
                                        ? "font-bold text-primary"
                                        : null
                                } `}
                            />

                            <span className="transition-all duration-300 ease-out group-hover:text-primary">
                                {item.title}
                            </span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
