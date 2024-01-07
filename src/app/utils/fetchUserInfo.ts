"use server";

import { prisma } from "@/lib/db/prisma";
import { UserPayload } from "@/types/UserPayload";

export async function fetchUserInfo(id: string): Promise<UserPayload | null> {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            smsNoti: true,
            emailNoti: true,
            tel: true,
            verified: true,
        },
    });
    return user;
}
