"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ViewButtonProps = {
    children: React.ReactNode;
    id: string;
};

export default function ViewButton({ children, id }: ViewButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/admin/dashboard/users/${id}`);
    };

    return (
        <span onClick={handleClick} className="cursor-pointer">
            {children}
        </span>
    );
}
