"use client";

import {
    BanknotesIcon,
    CubeIcon,
    ReceiptPercentIcon,
    UserGroupIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { DashboardIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconSize = 16;

const menuItems = [
    {
        title: "Sayfalar",
        list: [
            {
                title: "Ana Sayfa",
                path: "/admin/dashboard",
                icon: <DashboardIcon height={iconSize} width={iconSize} />,
            },
            {
                title: "Siparişler",
                path: "#",
                icon: <BanknotesIcon height={iconSize} width={iconSize} />,
            },
            {
                title: "Ürünler",
                path: "/admin/dashboard/products",
                icon: <CubeIcon height={iconSize} width={iconSize} />,
            },
            {
                title: "Kullanıcılar",
                path: "/admin/dashboard/users",
                icon: <UsersIcon height={iconSize} width={iconSize} />,
            },
            {
                title: "Bayiler",
                path: "/admin/dashboard/dealers",
                icon: <UserGroupIcon height={iconSize} width={iconSize} />,
            },
            {
                title: "Kuponlar",
                path: "#",
                icon: <ReceiptPercentIcon height={iconSize} width={iconSize} />,
            },
        ],
    },
    {
        title: "Analizler",
        list: [
            {
                title: "Lorem1",
                path: "#",
                icon: <DashboardIcon height={iconSize} width={iconSize} />,
            },
            {
                title: "Lorem2",
                path: "#",
                icon: <DashboardIcon height={iconSize} width={iconSize} />,
            },
            {
                title: "Lorem3",
                path: "#",
                icon: <DashboardIcon height={iconSize} width={iconSize} />,
            },
        ],
    },
];

export default function SideBar() {
    const pathname = usePathname();

    return (
        <>
            <div className="mb-12 flex items-center justify-center">
                <Link href="/">
                    <Image
                        src="/images/mobile.png"
                        width={280}
                        height={110}
                        className="h-auto"
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="space-y-8">
                {menuItems.map((item) => (
                    <div className="flex flex-col" key={item.title}>
                        <h2 className="text-sm font-bold text-gray-400">
                            {item.title}
                        </h2>

                        <ul className="mt-1">
                            {item.list.map((listItem) => (
                                <li key={listItem.title} className="mt-1">
                                    <Link href={listItem.path}>
                                        <div
                                            className={`rounded-lg py-4 transition-colors duration-150 ease-in-out hover:bg-gray-200/5 ${
                                                pathname === listItem.path
                                                    ? "bg-gray-200/5"
                                                    : ""
                                            }`}
                                        >
                                            <div className="mx-4 flex flex-row items-center gap-2.5 text-sm">
                                                <i>{listItem.icon}</i>
                                                <span>{listItem.title}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
