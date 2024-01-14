const IdentificationIcon = dynamic(
    () => import("@heroicons/react/24/outline/IdentificationIcon")
);
const CalendarIcon = dynamic(
    () => import("@heroicons/react/24/outline/CalendarIcon")
);
const MapPinIcon = dynamic(
    () => import("@heroicons/react/24/outline/MapPinIcon")
);
const ReceiptPercentIcon = dynamic(
    () => import("@heroicons/react/24/outline/ReceiptPercentIcon")
);
const HeartIcon = dynamic(
    () => import("@heroicons/react/24/outline/HeartIcon")
);
const LockClosedIcon = dynamic(
    () => import("@heroicons/react/24/outline/LockClosedIcon")
);

import dynamic from "next/dynamic";

import Link from "next/link";
import { Suspense } from "react";

export default function AccountPage() {
    const pages = [
        {
            title: "KİŞİSEL BİLGİLER",
            icon: <IdentificationIcon height={32} width={32} />,
            slug: "bilgilerim",
        },
        {
            title: "SİPARİŞ GEÇMİŞİ",
            icon: <CalendarIcon height={32} width={32} />,
            slug: "siparislerim",
        },
        {
            title: "ADRESLER",
            icon: <MapPinIcon height={32} width={32} />,
            slug: "adreslerim",
        },
        {
            title: "KUPONLAR",
            icon: <ReceiptPercentIcon height={32} width={32} />,
            slug: "kuponlarim",
        },
        {
            title: "FAVORİ ÜRÜNLER",
            icon: <HeartIcon height={32} width={32} />,
            slug: "favorilerim",
        },
        {
            title: "ŞİFRE DEĞİŞTİRME",
            icon: <LockClosedIcon height={32} width={32} />,
            slug: "sifre-degistir",
        },
    ] as {
        title: string;
        icon: React.ReactNode;
        slug: string;
    }[];

    return (
        <div className="m-auto min-w-[300px] max-w-6xl p-6">
            <div className="p-6 pt-0">
                <h2 className="mt-6 text-xl font-bold">Hesabınız</h2>

                <ul className="mt-6 grid grid-cols-3 items-center gap-8 font-bold">
                    {pages.map((page) => (
                        <li className="w-full" key={page.slug}>
                            <Link href={`hesabim/${page.slug}`}>
                                <div className="card w-full transform bg-base-100 shadow-md transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-base-200 hover:shadow-md">
                                    <figure className="px-8 pt-8">
                                        <Suspense>{page.icon}</Suspense>
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title text-[16px] font-bold text-gray-800">
                                            {page.title}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
