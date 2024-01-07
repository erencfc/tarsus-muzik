"use server";

import { prisma } from "@/lib/db/prisma";
import { UserPayload } from "@/types/UserPayload";

export default async function Favorites({ user }: { user: UserPayload }) {
    const data = await prisma.favorite.findMany({
        where: {
            userId: user.id,
        },
    });

    const favorites = data.map((favorite) => favorite.productId);

    return (
        <div>
            <h1 className="text-2xl font-bold">Favori Ürünlerim</h1>
        </div>
    );
}
