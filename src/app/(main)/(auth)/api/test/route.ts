import { prisma } from "@/lib/db/prisma";
import { formatSlug } from "@/lib/format";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    try {
        const allBrands = (
            await prisma.product.findMany({
                where: {
                    Category: {
                        slug: "gitarlar",
                    },
                },
                include: { Brand: true },
            })
        ).map(({ Brand: { name, slug } }) => ({
            name,
            slug: formatSlug(slug),
        }));

        const data = Object.entries(
            allBrands.reduce((acc, { name }) => {
                acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {})
        ).map(([name, count]) => ({ name, slug: formatSlug(name), count }));

        return NextResponse.json({
            data,
        });
    } catch (error: unknown) {
        console.log(error);

        return NextResponse.json({
            error: getErrorMessage(error),
        });
    }
}
