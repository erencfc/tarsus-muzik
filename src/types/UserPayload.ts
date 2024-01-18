import { Prisma } from "@prisma/client";

export type UserPayload = Prisma.UserGetPayload<{
    select: {
        id: true;
        email: true;
        firstName: true;
        lastName: true;
        smsNoti: true;
        emailNoti: true;
        tel: true;
        emailVerified: true;
    };
}>;
