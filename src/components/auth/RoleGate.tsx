"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { Role } from "@prisma/client";
import { FormError } from "@/components/Form/form-error";

type RoleGateProps = {
    children: React.ReactNode;
    allowedRole: Role;
};

export default function RoleGate({ children, allowedRole }: RoleGateProps) {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold text-white">
                    Yetkisiz Erişim
                </h1>
                <FormError
                    message="Bu sayfaya erişim yetkiniz bulunmamaktadır.
            "
                />
            </div>
        );
    }

    return <>{children}</>;
}
