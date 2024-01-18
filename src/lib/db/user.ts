"use server";

import { Prisma, Role } from "@prisma/client";
import { prisma } from "./prisma";
import { currentRole } from "../auth";

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

export async function getUserCount(): Promise<number> {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return 0;
    }

    try {
        //! TODO: Rolü sadece USER olanları sayacak şekilde güncelle.
        const count = await prisma.user.count();

        return count;
    } catch (error: any) {
        console.error(error);

        return 0;
    }
}

export const getUsers = async ({
    currentPage,
    itemsPerPage,
    q,
}: {
    currentPage: number;
    itemsPerPage: number;
    q?: string;
}) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return [];
    }

    let where: Prisma.UserWhereInput = {};

    if (q?.length > 0) {
        where = {
            OR: [
                {
                    firstName: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
                {
                    lastName: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
                {
                    tel: {
                        contains: q,
                        mode: "insensitive",
                    },
                },
            ],
        };
    }

    const users = await prisma.user.findMany({
        where,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            tel: true,
            role: true,
            createdAt: true,
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    return users;
};
