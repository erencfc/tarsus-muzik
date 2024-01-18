import { Role } from "@prisma/client";

export const getUserRole = (role: Role) => {
    switch (role) {
        case Role.ADMIN:
            return { name: "Admin", color: "text-red-400" };
        case Role.DEALER:
            return { name: "Bayi", color: "text-yellow-400" };
        case Role.USER:
            return { name: "Üye", color: "text-green-400" };
        default:
            return { name: "Bilinmiyor", color: "text-gray-400" };
    }
};
