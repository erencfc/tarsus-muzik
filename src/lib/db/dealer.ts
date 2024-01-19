"use server";

import { Prisma, Role } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { currentRole } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type GetDealersProps = {
    currentPage: number;
    itemsPerPage: number;
    q?: string;
};

type DeleteDealerProps = {
    id: string;
    deleteUser?: boolean;
};

type GetDealerByIdProps = {
    id: string;
    select?: Prisma.DealerSelect;
    include?: Prisma.DealerInclude;
};
type GetDealerPricesProps = {
    id: string;
    currentPage: number;
    itemsPerPage: number;
    q?: string;
};

export async function getDealerCount(): Promise<number> {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return 0;
    }

    try {
        const count = await prisma.dealer.count();

        return count;
    } catch (error: any) {
        console.error(error);

        return 0;
    }
}

export const getDealers = async ({
    currentPage,
    itemsPerPage,
    q,
}: GetDealersProps) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return [];
    }

    let where: Prisma.DealerWhereInput = {};

    if (q?.length > 0) {
        where = {
            OR: [
                {
                    User: {
                        firstName: {
                            contains: q,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    User: {
                        lastName: {
                            contains: q,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    User: {
                        email: {
                            contains: q,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    User: {
                        tel: {
                            contains: q,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        };
    }

    const dealers = await prisma.dealer.findMany({
        where: {
            ...where,
        },
        select: {
            id: true,
            User: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    tel: true,
                },
            },
            _count: {
                select: {
                    prices: true,
                },
            },
            createdAt: true,
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    return dealers;
};

// export const getDealerById = async ({
//     id,
//     select,
//     include,
// }: GetDealerByIdProps) => {
//     const role = await currentRole();

//     if (role !== Role.ADMIN) {
//         return null;
//     }

//     let args: Prisma.DealerFindUniqueArgs = { where: { id } };

//     if (select) {
//         args = { ...args, select };
//     }
//     if (include) {
//         args = { ...args, include };
//     }

//     try {
//         const dealer = await prisma.dealer.findUnique({ ...args });

//         return dealer;
//     } catch (error: any) {
//         console.error(error);

//         return null;
//     }
// };

export const deleteDealer = async ({
    id,
    deleteUser = false,
}: DeleteDealerProps) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return { error: "Bu işlemi yapmak için yetkiniz yok." };
    }

    try {
        if (deleteUser) {
            const dealer = await prisma.dealer.findUnique({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });

            if (!dealer) {
                return { error: "Bayi bulunamadı." };
            }

            await prisma.user.delete({ where: { id: dealer.userId } });

            revalidatePath("/admin/dashboard/dealers");
            return { success: "Bayi ve kullanıcı başarıyla silindi." };
        } else {
            const deletedDealer = await prisma.dealer.delete({ where: { id } });

            await prisma.user.update({
                where: {
                    id: deletedDealer.userId,
                },
                data: {
                    role: Role.USER,
                },
            });

            revalidatePath("/admin/dashboard/dealers");
            return { success: "Bayi başarıyla silindi." };
        }
    } catch (error) {
        console.log(error);
        return { error: "Bir hata oluştu." };
    }
};

//* Dealer Prices
export const getDealerPrices = async ({
    id,
    currentPage,
    itemsPerPage,
    q,
}: GetDealerPricesProps) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return [];
    }

    let where: Prisma.DealerPriceWhereInput = {};

    if (q?.length > 0) {
        where = {
            OR: [
                {
                    Dealer: {
                        User: {
                            firstName: {
                                contains: q,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    Dealer: {
                        User: {
                            lastName: {
                                contains: q,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    Dealer: {
                        User: {
                            email: {
                                contains: q,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                {
                    Dealer: {
                        User: {
                            tel: {
                                contains: q,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ],
        };
    }

    const prices = await prisma.dealerPrice.findMany({
        where: {
            ...where,
            dealerId: id,
        },
        select: {
            id: true,
            createdAt: true,
            price: true,
            Product: {
                select: {
                    id: true,
                    images: true,
                    stock: true,
                    price: true,
                    model: true,
                    modelSlug: true,
                    Category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    SubCategory: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    return prices;
};

export const getDealerPricesCount = async (id: string): Promise<number> => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return 0;
    }

    try {
        const count = await prisma.dealerPrice.count({
            where: {
                dealerId: id,
            },
        });

        return count;
    } catch (error: any) {
        console.error(error);

        return 0;
    }
};

export const deleteDealerPrice = async ({ id }: { id: string }) => {
    const role = await currentRole();

    if (role !== Role.ADMIN) {
        return { error: "Bu işlemi yapmak için yetkiniz yok." };
    }

    try {
        await prisma.dealerPrice.delete({ where: { id } });

        revalidatePath("/admin/dashboard/dealers");
        return { success: "Bayi fiyatı başarıyla silindi." };
    } catch (error) {
        console.log(error);
        return { error: "Bir hata oluştu." };
    }
};
