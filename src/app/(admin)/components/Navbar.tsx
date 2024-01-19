"use client";

import { usePathname } from "next/navigation";

const titles = [
    {
        path: "",
        title: "Ana Sayfa",
    },
    {
        path: "/orders",
        title: "Siparişler",
    },
    {
        path: "/products",
        title: "Ürünler",
    },
    {
        path: "/users",
        title: "Kullanıcılar",
    },
    {
        path: "/coupons",
        title: "Kuponlar",
    },
];

export default function Navbar() {
    const pathname = usePathname().split("/admin/dashboard")[1];

    return (
        <div className="flex flex-row items-center justify-between rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h1 className="font-semibold text-gray-400">
                {titles.find((title) => title.path === pathname)?.title}
            </h1>
        </div>
    );
}
