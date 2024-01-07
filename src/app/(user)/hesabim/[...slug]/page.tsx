"use server";

import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { fetchUserInfo } from "@/app/utils/fetchUserInfo";

import Loading from "@/app/loading";
import { Suspense } from "react";

const Addresses = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/Addresses")
);
const Coupons = dynamic(() => import("@/app/(user)/hesabim/[...slug]/Coupons"));
const Favorites = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/Favorites")
);
const Orders = dynamic(() => import("@/app/(user)/hesabim/[...slug]/Orders"));
const PersonalInformation = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/PersonalInformation")
);
const ChangePassword = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/ChangePassword")
);

export default async function AccountSlugPage({
    params,
}: {
    params: { slug: string[] };
}) {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as any;

    const user = await fetchUserInfo(sessionUser?.id);

    if (!user) return null;

    const { slug } = params;
    const page = slug[0];

    const components: { [key: string]: React.ElementType } = {
        bilgilerim: PersonalInformation,
        siparislerim: Orders,
        adreslerim: Addresses,
        kuponlarim: Coupons,
        favorilerim: Favorites,
        "sifre-degistir": ChangePassword,
    };

    const ComponentToRender = components[page];

    if (ComponentToRender) {
        return (
            <Suspense fallback={<Loading />}>
                <ComponentToRender user={user} />
            </Suspense>
        );
    } else {
        console.log("Page not found");
        return null;
    }
}
