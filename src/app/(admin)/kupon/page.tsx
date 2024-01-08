"use server";

import { prisma } from "@/lib/db/prisma";
import CouponsTable from "./CouponsTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateCouponButton from "./CreateCouponButton";
import CreateModal from "./CreateModal";

export default async function CouponPage() {
    const coupons = await prisma.coupon.findMany({
        include: {
            Category: true,
            SubCategory: true,
        },
    });

    const categories = await prisma.category.findMany({
        include: { SubCategory: true },
    });

    return (
        <div className="m-auto min-w-[300px] max-w-6xl p-6">
            <CreateModal categories={categories} />
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Kuponlar</h1>
                <CreateCouponButton />
            </div>
            <div className="h-[672px] min-h-[250px] overflow-auto">
                <CouponsTable coupons={coupons} />
            </div>
        </div>
    );
}
