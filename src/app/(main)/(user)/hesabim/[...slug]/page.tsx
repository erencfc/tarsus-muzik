"use server";

import dynamic from "next/dynamic";

import Loading from "@/app/loading";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

const Coupons = dynamic(
    () => import("@/app/(main)/(user)/hesabim/[...slug]/Coupons"),
    {
        loading: () => <Loading />,
    }
);
const Favorites = dynamic(
    () => import("@/app/(main)/(user)/hesabim/[...slug]/(favorites)/Favorites"),
    {
        loading: () => <Loading />,
    }
);
const Orders = dynamic(
    () => import("@/app/(main)/(user)/hesabim/[...slug]/Orders"),
    {
        loading: () => <Loading />,
    }
);
const PersonalInformation = dynamic(
    () =>
        import(
            "@/app/(main)/(user)/hesabim/[...slug]/(personal_information)/PersonalInformation"
        ),
    {
        loading: () => <Loading />,
    }
);
const ChangePassword = dynamic(
    () =>
        import(
            "@/app/(main)/(user)/hesabim/[...slug]/(change_password)/ChangePassword"
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
    // const sessionUser = await currentUser();
    // const user = await getUserById({
    //     id: sessionUser?.id,
    //     select: {
    //         id: true,
    //         email: true,
    //         firstName: true,
    //         lastName: true,
    //         smsNoti: true,
    //         emailNoti: true,
    //         tel: true,
    //         emailVerified: true,
    //     },
    // });
    // if (!user) return null;
    // const { slug } = params;
    // const page = slug[0];
    // const components: { [key: string]: React.ElementType } = {
    //     bilgilerim: PersonalInformation,
    //     // siparislerim: Orders,
    //     adreslerim: PersonalInformation,
    //     // kuponlarim: Coupons,
    //     favorilerim: Favorites,
    //     "sifre-degistir": ChangePassword,
    // };
    // const ComponentToRender = components[page];
    // if (ComponentToRender) {
    //     return (
    //         <div className="m-auto my-6 min-h-[672px] min-w-[300px] max-w-6xl p-6">
    //             <Suspense fallback={<Loading />}>
    //                 <ComponentToRender user={user} />
    //             </Suspense>
    //         </div>
    //     );
    // } else {
    //     redirect("/hesabim");
    // }
}
