import { prisma } from "@/lib/db/prisma";
import { formatSlug } from "@/lib/format";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";
import randomBytes from "randombytes";

export async function GET(req: any) {
    try {
        const data = await prisma.product.findMany({
            select: {
                id: true,
                model: true,
                modelSlug: true,
                Category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                SubCategory: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 210,
        });

        data.forEach(async (product) => {
            await prisma.product.update({
                where: { id: product.id },
                data: {
                    Category: {
                        connect: {
                            name: "Nefesliler",
                        },
                    },
                    SubCategory: {
                        connect: {
                            name: "Nefesli Aksesuarları",
                        },
                    },
                },
            });
        });

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
