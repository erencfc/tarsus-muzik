import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export const getUserById = async (id: string, select?: Prisma.UserSelect) => {
    try {
        let args: Prisma.UserFindUniqueArgs = { where: { id } };

        if (select) {
            args = { ...args, select };
        }
        const user = await prisma.user.findUnique({ ...args });

        return user;
    } catch (error) {
        return null;
    }
};

export const getUserByEmail = async (
    email: string,
    select?: Prisma.UserSelect
) => {
    try {
        let args: Prisma.UserFindUniqueArgs = { where: { email } };

        if (select) {
            args = { ...args, select };
        }
        const user = await prisma.user.findUnique({ ...args });

        return user;
    } catch (error) {
        return null;
    }
};

export const getUserByTel = async (tel: string, select?: Prisma.UserSelect) => {
    try {
        let args: Prisma.UserFindUniqueArgs = { where: { tel } };

        if (select) {
            args = { ...args, select };
        }
        const user = await prisma.user.findUnique({ ...args });

        return user;
    } catch (error) {
        return null;
    }
};
