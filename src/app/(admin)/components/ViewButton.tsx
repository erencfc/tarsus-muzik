"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ViewButton({ url }: { url: string }) {
    const router = useRouter();
    const handleClick = () => {
        router.push(url);
    };

    return (
        <Button variant="outline" size="sm" onClick={handleClick}>
            İncele
        </Button>
    );
}
