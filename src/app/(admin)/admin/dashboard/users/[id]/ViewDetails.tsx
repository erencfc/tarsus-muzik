"use client";

import { useCallback, useEffect, useState } from "react";

import { getUserById } from "@/data/user";
import { Role } from "@prisma/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserDetails from "@/app/(admin)/components/UserDetails";
import Loading from "@/app/loading";
import { FormError } from "@/components/Form/form-error";

export default function ViewDetails({ id }: { id: string }) {
    const currentUser = useCurrentUser();

    const [user, setUser] = useState<any>(null);

    const onSubmit = useCallback(async () => {
        const u = await getUserById({
            id,
            include: {
                _count: {
                    select: {
                        Favorite: true,
                        Order: true,
                    },
                },
                Cart: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        setUser(u);
    }, [id]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    if (!user) {
        return <Loading />;
    }

    if (currentUser.role !== Role.ADMIN) {
        return (
            <FormError message="Bu sayfayı görüntülemek için yetkiniz yok." />
        );
    }

    return <UserDetails user={user} />;
}
