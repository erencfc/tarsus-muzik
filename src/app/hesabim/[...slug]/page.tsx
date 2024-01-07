"use server";

import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserInfo } from "@/app/utils/fetchUserInfo";

import Loading from "@/app/loading";

const Addresses = dynamic(() => import("@/app/hesabim/[...slug]/Addresses"));
const Coupons = dynamic(() => import("@/app/hesabim/[...slug]/Coupons"));
const Favorites = dynamic(() => import("@/app/hesabim/[...slug]/Favorites"));
const Orders = dynamic(() => import("@/app/hesabim/[...slug]/Orders"));
const PersonalInformation = dynamic(
    () => import("@/app/hesabim/[...slug]/PersonalInformation"),
    {
        loading: () => <Loading />,
    }
);
const ChangePassword = dynamic(
    () => import("@/app/hesabim/[...slug]/ChangePassword")
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
        return <ComponentToRender user={user} />;
    } else {
        console.log("Page not found");
        return null;
    }
}
