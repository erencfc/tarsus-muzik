"use server";

import { prisma } from "./prisma";

export async function ToggleFavorite(
    userId: string,
    productId: string
): Promise<{ success: boolean; message?: string }> {
    try {
        const isFavorite = await prisma.favorite.findFirst({
            where: {
                userId,
                productId,
            },
        });

        if (isFavorite) {
            await prisma.favorite.delete({
                where: {
                    id: isFavorite.id,
                },
            });

            return {
                success: true,
                message: "Ürün favorilerinizden kaldırıldı.",
            };
        } else {
            await prisma.favorite.create({
                data: {
                    User: {
                        connect: {
                            id: userId,
                        },
                    },
                    Product: {
                        connect: {
                            id: productId,
                        },
                    },
                },
            });

            return {
                success: true,
                message: "Ürün favorilerinize eklendi.",
            };
        }
    } catch (error: any) {
        console.error(error);

        return {
            success: false,
            message: "Bir hata oluştu.",
        };
    }
}
