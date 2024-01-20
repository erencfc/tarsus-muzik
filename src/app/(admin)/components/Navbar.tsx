"use client";

import { usePathname } from "next/navigation";

const titles = [
    {
        path: "/orders",
        title: "Siparişler",
    },
    {
        path: "/products/new",
        title: "Yeni Ürün Ekle",
    },
    {
        path: "/products/",
        title: "Ürün Detayları",
    },
    {
        path: "/products",
        title: "Ürünler",
    },
    {
        path: "/users/new",
        title: "Yeni Kullanıcı Ekle",
    },
    {
        path: "/users/",
        title: "Kullanıcı Detayları",
    },
    {
        path: "/users",
        title: "Kullanıcılar",
    },
    {
        path: "/dealers",
        title: "Bayiler",
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
                {titles.find((title) => pathname.startsWith(title.path))
                    ?.title ?? "Ana Sayfa"}
            </h1>
        </div>
    );
}
