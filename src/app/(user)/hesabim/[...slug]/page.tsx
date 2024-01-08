"use server";

import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { fetchUserInfo } from "@/app/utils/fetchUserInfo";

import Loading from "@/app/loading";
import { Suspense } from "react";

const Addresses = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/(addresses)/Addresses"),
    {
        loading: () => <Loading />,
    }
);
const Coupons = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/Coupons"),
    {
        loading: () => <Loading />,
    }
);
const Favorites = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/(favorites)/Favorites"),
    {
        loading: () => <Loading />,
    }
);
const Orders = dynamic(() => import("@/app/(user)/hesabim/[...slug]/Orders"), {
    loading: () => <Loading />,
});
const PersonalInformation = dynamic(
    () => import("@/app/(user)/hesabim/[...slug]/PersonalInformation"),
    {
        loading: () => <Loading />,
    }
);
const ChangePassword = dynamic(
    () =>
        import(
            "@/app/(user)/hesabim/[...slug]/(change_password)/ChangePassword"
        ),
    {
        loading: () => <Loading />,
    }
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
            <div className="m-auto min-w-[300px] max-w-6xl p-6">
                <Suspense fallback={<Loading />}>
                    <ComponentToRender user={user} />
                </Suspense>
            </div>
        );
    } else {
        console.log("Page not found");
        return null;
    }
}
