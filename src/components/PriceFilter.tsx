"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [prices, setPrices] = useState<{
        min: number;
        max: number;
    }>({
        min: Number(searchParams.get("min")),
        max: Number(searchParams.get("max")),
    });

    return (
        <div>
            <CardTitle className="text-xl font-bold">Fiyat</CardTitle>
            <div className="mt-3 flex flex-row gap-3">
                <Input
                    type="number"
                    placeholder="En Az"
                    value={prices.min || ""}
                    onChange={(e) =>
                        setPrices({ ...prices, min: Number(e.target.value) })
                    }
                    className="h-10 rounded-lg border-gray-300 bg-base-100 text-gray-800 ring-offset-primary focus:ring-0 dark:border-gray-300 dark:bg-base-100 dark:ring-offset-primary dark:focus:ring-0"
                />
                <Input
                    type="number"
                    placeholder="En Çok"
                    value={prices.max || ""}
                    onChange={(e) =>
                        setPrices({ ...prices, max: Number(e.target.value) })
                    }
                    className="h-10 rounded-lg border-gray-300 bg-base-100 text-gray-800 ring-offset-primary focus:ring-0 dark:border-gray-300 dark:bg-base-100 dark:ring-offset-primary dark:focus:ring-0"
                />
            </div>
            <Button
                variant="outline"
                className="mt-3 w-full border-gray-300 bg-primary text-white dark:border-gray-300 dark:bg-primary"
                onClick={() => {
                    const newSearchParams = new URLSearchParams(searchParams);

                    if (prices.min) {
                        newSearchParams.set("min", prices.min.toString());
                    } else {
                        newSearchParams.delete("min");
                    }

                    if (prices.max) {
                        newSearchParams.set("max", prices.max.toString());
                    } else {
                        newSearchParams.delete("max");
                    }

                    newSearchParams.delete("sayfa");

                    router.push(`${pathname}?${newSearchParams.toString()}`, {
                        scroll: false,
                    });
                }}
            >
                Uygula
            </Button>
        </div>
    );
}
